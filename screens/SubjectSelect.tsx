import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const SubjectSelect: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    { name: 'Mathematics', nameAmh: 'ሒሳብ', progress: 75, icon: 'calculate', color: 'blue' },
    { name: 'Biology', nameAmh: 'ባዮሎጂ', progress: 45, icon: 'eco', color: 'green' },
    { name: 'Chemistry', nameAmh: 'ኬሚስትሪ', progress: 60, icon: 'science', color: 'purple' },
    { name: 'Physics', nameAmh: 'ፊዚክስ', progress: 20, icon: 'rocket_launch', color: 'orange' },
    { name: 'English', nameAmh: 'እንግሊዝኛ', progress: 0, icon: 'translate', color: 'indigo' },
    { name: 'Amharic', nameAmh: 'አማርኛ', progress: 0, icon: 'history_edu', color: 'red' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur-sm dark:border-gray-800 dark:bg-background-dark/90">
        <h1 className="text-xl font-bold">EthioLearn AI</h1>
        <div className="relative">
          <button className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <span className="material-symbols-outlined">person</span>
          </button>
          <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white dark:border-background-dark">5</div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight">Choose a Subject</h1>
        <p className="pt-1 text-base text-gray-500 dark:text-gray-400">የትኛውን መማር ትፈልጋለህ?</p>

        <div className="mt-8 grid gap-4">
          {items.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(AppRoute.Materials)}
              className={`flex min-h-[72px] cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all hover:scale-[1.01] bg-${item.color}-50 border-${item.color}-200 dark:bg-${item.color}-900/20 dark:border-${item.color}-900`}
              // Tailwind arbitrary dynamic classes might fail in JIT without full safelist, so we use style for specific colors or just standard classes. 
              // To ensure it works in the generated code without complex setup, I'll fallback to a generic style if dynamic classes fail, but will try to map common ones.
              style={{borderColor: `var(--${item.color}-200)`, backgroundColor: `var(--${item.color}-50)`}}
            >
              <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-white bg-${item.color}-500 shadow-sm`} style={{backgroundColor: item.color === 'blue' ? '#3b82f6' : item.color === 'green' ? '#22c55e' : item.color === 'purple' ? '#a855f7' : item.color === 'orange' ? '#f97316' : item.color === 'indigo' ? '#6366f1' : '#ef4444'}}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-base font-bold">{item.name}</p>
                <p className="text-sm font-medium opacity-80" style={{color: item.color === 'blue' ? '#2563eb' : item.color === 'green' ? '#16a34a' : 'inherit'}}>{item.nameAmh}</p>
              </div>
              
              {/* Circular Progress */}
              <div className="relative size-12 shrink-0">
                 <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <circle className="stroke-current opacity-20" cx="18" cy="18" fill="none" r="16" strokeWidth="3" style={{color: item.color === 'blue' ? '#3b82f6' : '#22c55e'}}></circle>
                    <circle className="stroke-current" cx="18" cy="18" fill="none" r="16" strokeDasharray="100, 100" strokeDashoffset={100 - item.progress} strokeLinecap="round" strokeWidth="3" style={{color: item.color === 'blue' ? '#3b82f6' : item.color === 'green' ? '#22c55e' : item.color === 'purple' ? '#a855f7' : item.color === 'orange' ? '#f97316' : item.color === 'indigo' ? '#6366f1' : '#ef4444'}}></circle>
                 </svg>
                 <p className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{color: item.color === 'blue' ? '#2563eb' : '#16a34a'}}>{item.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <button className="fixed bottom-24 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default SubjectSelect;