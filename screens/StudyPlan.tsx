import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const StudyPlan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="flex-1 text-center font-bold">Create Your Study Plan</h1>
        <span className="text-primary font-bold text-sm">አማ/EN</span>
      </header>
      
      <div className="flex justify-center gap-2 py-4">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary/30"></div>
        <div className="h-2 w-2 rounded-full bg-primary/30"></div>
      </div>

      <main className="flex-1 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
          <h2 className="text-2xl font-bold">What are you preparing for?</h2>
          
          <div>
            <label className="block font-medium mb-2">Study Plan Name</label>
            <input className="w-full h-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4" placeholder="e.g., Grade 10 Final Exam" />
          </div>

          <div>
            <label className="block font-medium mb-2">Select your exam date</label>
            <div className="flex justify-between items-center mb-4">
              <button><span className="material-symbols-outlined">chevron_left</span></button>
              <span className="font-bold">December 2024</span>
              <button><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
            
            <div className="grid grid-cols-7 text-center gap-y-2">
               {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-xs font-bold text-gray-500">{d}</span>)}
               {[...Array(31)].map((_, i) => (
                 <div key={i} className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium ${i === 4 ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                   {i+1}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
        <button onClick={() => navigate(AppRoute.Dashboard)} className="w-full h-14 bg-primary text-white font-bold rounded-xl">Continue</button>
      </div>
    </div>
  );
};

export default StudyPlan;