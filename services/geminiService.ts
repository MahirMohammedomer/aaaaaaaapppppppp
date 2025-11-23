import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string, 
  history: {role: string, parts: {text: string}[]}[] = [],
  language: 'en' | 'am' = 'en'
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    let systemInstruction = "You are a helpful and encouraging AI tutor for Ethiopian students. You can explain concepts in both English and Amharic. Keep answers concise and educational.";
    
    if (language === 'am') {
      systemInstruction = "You are a helpful AI tutor for Ethiopian students. Respond primarily in Amharic. You can use English for technical terms but explain them in Amharic. Keep answers concise and educational.";
    }

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};