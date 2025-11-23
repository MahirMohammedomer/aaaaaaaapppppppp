import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const GroupStudy: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: 'A', text: 'F = m / a' },
    { id: 'B', text: 'F = m * a', correct: true },
    { id: 'C', text: 'F = a / m' },
    { id: 'D', text: 'F = m + a', wrong: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex flex-col">
       {/* App Bar */}
       <header className="bg-blue-700 p-4 flex items-center justify-between text-white shadow-md">
         <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
         <h1 className="font-bold text-lg">Grade 8 Physics - Chapter 3</h1>
         <button className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">+ Invite (4)</button>
       </header>

       {/* Avatars */}
       <div className="p-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
         <div className="flex -space-x-3">
           {[1,2,3].map(i => (
             <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
           ))}
           <div className="w-10 h-10 rounded-full border-2 border-white bg-yellow-400 flex items-center justify-center text-blue-900 font-bold">A</div>
         </div>
         <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"><span className="material-symbols-outlined">add</span></button>
       </div>

       {/* Question */}
       <main className="flex-1 p-6 flex flex-col items-center max-w-lg mx-auto w-full pb-32">
         <h2 className="text-2xl font-bold mb-2">Question 5 of 10</h2>
         <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">What is the formula for calculating force?</p>
         
         {/* Timer */}
         <div className="flex gap-4 w-full mb-8">
           {['00', '00', '25'].map((val, i) => (
             <div key={i} className="flex-1 flex flex-col items-center">
                <div className="h-14 w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center text-xl font-bold border border-gray-100 dark:border-gray-700">
                  <span className={i === 2 ? 'text-red-500' : ''}>{val}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">{['Hours', 'Minutes', 'Seconds'][i]}</span>
             </div>
           ))}
         </div>

         {/* Options */}
         <div className="w-full space-y-3">
           {options.map((opt) => (
             <button 
               key={opt.id}
               onClick={() => setSelected(opt.id)}
               className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
                  selected === opt.id 
                    ? (opt.correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500')
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
               }`}
             >
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                  selected === opt.id 
                   ? (opt.correct ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500')
                   : 'border-gray-300 text-gray-500'
               }`}>
                 {opt.id}
               </div>
               <span className="flex-1 text-left font-medium">{opt.text}</span>
               {selected === opt.id && opt.correct && <span className="material-symbols-outlined text-green-500">check_circle</span>}
               {selected === opt.id && !opt.correct && <span className="material-symbols-outlined text-red-500">cancel</span>}
             </button>
           ))}
         </div>
       </main>
       
       {/* Chat Input */}
       <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
         <div className="flex gap-2 items-center max-w-md mx-auto">
            <input className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
            <button className="text-gray-400"><span className="material-symbols-outlined">sentiment_satisfied</span></button>
            <button className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center"><span className="material-symbols-outlined">send</span></button>
         </div>
       </div>
    </div>
  );
};

export default GroupStudy;