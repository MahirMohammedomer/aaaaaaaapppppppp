import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// Helper to parse inline markdown (bold and inline code)
const parseInline = (text: string, isUser: boolean) => {
  // Split by bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    
    // Check for inline code (`text`)
    const codeParts = part.split(/(`.*?`)/g);
    if (codeParts.length > 1) {
        return <span key={i}>{codeParts.map((cp, j) => {
             if (cp.startsWith('`') && cp.endsWith('`')) {
                 const codeClass = isUser 
                    ? "bg-black/20 text-white" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600";
                 return <code key={j} className={`${codeClass} px-1.5 py-0.5 rounded font-mono text-sm mx-0.5`}>{cp.slice(1, -1)}</code>;
             }
             return cp;
        })}</span>;
    }
    return part;
  });
};

// Markdown Renderer Component
const MarkdownRenderer: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  // Split content by code blocks (```)
  const parts = content.split(/```/);
  
  return (
    <div className={`markdown-body break-words leading-relaxed ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // Code block content
          return (
            <div key={index} className="my-3 overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-sm">
              <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">code</span>
              </div>
              <pre className="p-3 overflow-x-auto text-xs sm:text-sm font-mono text-gray-300 whitespace-pre-wrap">
                <code>{part.trim()}</code>
              </pre>
            </div>
          );
        }

        // Regular text content
        const lines = part.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: React.ReactNode[] = [];
        let inList = false;

        lines.forEach((line, lineIdx) => {
            const trimmed = line.trim();
            // Check for bullet points (- or * or •)
            const bulletMatch = line.match(/^(\s*)[-*•]\s+(.*)/);
            
            if (bulletMatch) {
                if (!inList) inList = true;
                listItems.push(
                    <li key={`li-${index}-${lineIdx}`} className="ml-4 pl-1 mb-1">
                        {parseInline(bulletMatch[2], isUser)}
                    </li>
                );
            } else {
                if (inList) {
                    elements.push(<ul key={`ul-${index}-${lineIdx}`} className="list-disc list-outside ml-4 mb-3 space-y-1">{listItems}</ul>);
                    listItems = [];
                    inList = false;
                }
                
                if (trimmed) {
                    elements.push(
                        <p key={`p-${index}-${lineIdx}`} className={elements.length > 0 ? "mt-2" : ""}>
                            {parseInline(line, isUser)}
                        </p>
                    );
                }
            }
        });

        if (inList) {
             elements.push(<ul key={`ul-${index}-end`} className="list-disc list-outside ml-4 mb-3 space-y-1">{listItems}</ul>);
        }

        return <div key={index}>{elements}</div>;
      })}
    </div>
  );
};

const AiTutor: React.FC = () => {
  const navigate = useNavigate();
  const STORAGE_KEY = 'ethiolearn_ai_chat_history';

  // Language state
  const [language, setLanguage] = useState<'en' | 'am'>('en');

  const translations = {
    en: {
      title: 'AI Tutor',
      clearConfirm: 'Clear conversation history?',
      placeholder: 'Ask anything...',
      you: 'You',
      bot: 'EthioLearn AI',
      defaultMsg: "Hello! I'm your AI tutor. How can I help you with your studies today? You can ask me in Amharic or English.",
      sendError: "Sorry, I'm having trouble connecting right now. Please try again later."
    },
    am: {
      title: 'AI አስጠኚ',
      clearConfirm: 'የውይይት ታሪክ ይጥፋ?',
      placeholder: 'ማንኛውንም ነገር ይጠይቁ...',
      you: 'እርስዎ',
      bot: 'ኢትዮLearn AI',
      defaultMsg: "ሰላም! እኔ የእርስዎ AI አስጠኚ ነኝ። ዛሬ በጥናትዎ እንዴት ልርዳዎት እችላለሁ? በአማርኛ ወይም በእንግሊዝኛ መጠየቅ ይችላሉ።",
      sendError: "ይቅርታ፣ ግንኙነት መፍጠር አልተቻለም። እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ።"
    }
  };

  const t = translations[language];

  // Initialize state from localStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
    return [
      {
        id: '1',
        role: 'model',
        text: translations.en.defaultMsg, // Default to English initially
        timestamp: new Date()
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Pass language to service
      const responseText = await sendMessageToGemini(userMsg.text, history, language);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: t.sendError,
        timestamp: new Date()
      };
       setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleClear = () => {
    if (window.confirm(t.clearConfirm)) {
      const defaultMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'model',
        text: t.defaultMsg,
        timestamp: new Date()
      };
      setMessages([defaultMsg]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'am' : 'en');
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-background-dark p-4 border-b border-gray-200 dark:border-gray-800 shrink-0 gap-2">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">{t.title}</h2>
        
        <button 
            onClick={toggleLanguage} 
            className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-primary font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
            {language === 'en' ? 'አማ' : 'EN'}
        </button>

        <button onClick={handleClear} className="flex size-10 items-center justify-center text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 shrink-0 border border-gray-200 dark:border-gray-700" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAM3W8bUvPdhKXTkMEQcosboeLB6OVjbCaFNYIJsfbyF0CDNliPK2CtaKdUWeChVKci3lAPXxvntgHpFXBpdOLetKW6Err56SNyI7SkFH_ZyXPr888PT2B1dEP4V4IbonHt1qwh_Vk6segrv4SWsETzlDfLdXDX9WPo_Rf6z4aehMNk3gYH2M7tEJ4G4akVHe68h-z8gdMrq57tv4ZUSDxbUgWr9drFH4KrZFC_JMkI4NQHwqjKGPk1P2v_vhWnrtH6Jd9jBEjd0Xc")'}}
              ></div>
            )}
            
            <div className={`flex flex-col gap-1 max-w-[85vw] sm:max-w-[420px] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-gray-500 px-1">{msg.role === 'user' ? t.you : t.bot}</span>
              <div className={`w-full rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary rounded-br-sm' 
                  : 'bg-white dark:bg-gray-800 rounded-bl-sm border border-gray-100 dark:border-gray-700'
              }`}>
                <MarkdownRenderer content={msg.text} isUser={msg.role === 'user'} />
              </div>
              
              {msg.role === 'model' && (
                <div className="flex gap-2 pt-1 px-1">
                   <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"><span className="material-symbols-outlined text-sm">thumb_up</span></button>
                   <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 shrink-0" 
                 style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjS1u3BGnYFD4yU4i8scvUCNBg8oOEq1PUs1NmyUXPqiyeWUv53T6BGj48tS_JYbPxR4nGGllXPN3jXu_1kf4uoxrVS7AvSV6LgnmtGdBmYvw-FyuTja68uEe2Fe7qP17cJPorWsrAGCZMTXI7wlqL5OzehynigdXOSv1KoaJSRBhE3Pqgw-0Cf7OgyPnwDHId8U0TxDfg3ZxppBsYVWQfmw1OH7nf6fpsvPHT_Jf8khwT7j0nPPZXoSlP_qeOIV5eJeve6aDfCGU")'}}
              ></div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-end gap-3">
             <div className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 shrink-0 border border-gray-200 dark:border-gray-700" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAM3W8bUvPdhKXTkMEQcosboeLB6OVjbCaFNYIJsfbyF0CDNliPK2CtaKdUWeChVKci3lAPXxvntgHpFXBpdOLetKW6Err56SNyI7SkFH_ZyXPr888PT2B1dEP4V4IbonHt1qwh_Vk6segrv4SWsETzlDfLdXDX9WPo_Rf6z4aehMNk3gYH2M7tEJ4G4akVHe68h-z8gdMrq57tv4ZUSDxbUgWr9drFH4KrZFC_JMkI4NQHwqjKGPk1P2v_vhWnrtH6Jd9jBEjd0Xc")'}}
              ></div>
             <div className="flex items-center space-x-2 rounded-2xl rounded-bl-sm px-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white dark:bg-background-dark p-4 pt-2 border-t border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pl-4 pr-12 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 focus:outline-none border-0 placeholder:text-gray-500"
              placeholder={t.placeholder} 
              type="text"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shrink-0 shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AiTutor;