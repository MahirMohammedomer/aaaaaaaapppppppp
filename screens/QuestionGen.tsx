import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const QuestionGen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">Generate Questions</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4 pb-24 space-y-6">
        {/* Toggle */}
        <div className="flex justify-center">
          <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1">
            <button className="px-6 py-1.5 rounded-full bg-white dark:bg-gray-700 shadow-sm text-primary font-bold text-sm">EN</button>
            <button className="px-6 py-1.5 rounded-full text-gray-500 font-medium text-sm">አማ</button>
          </div>
        </div>
        
        <p className="text-center text-gray-500">Customize your practice session below</p>

        {/* Subject */}
        <div>
          <label className="block text-sm font-bold mb-2">Subject / Chapter</label>
          <select className="w-full h-14 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
            <option>Select a subject</option>
            <option>Physics - Grade 12</option>
          </select>
        </div>

        {/* Types */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold mb-3">Select Question Type(s)</h3>
          <div className="flex flex-wrap gap-2">
            {['MCQ', 'True/False', 'Fill-in-the-blank', 'Short Answer'].map(t => (
               <button key={t} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium hover:border-primary hover:bg-primary/5 dark:hover:border-primary transition-colors">{t}</button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold mb-3">Choose Difficulty Level</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Easy', 'Medium', 'Hard'].map(l => (
              <button key={l} className={`py-3 rounded-lg border-2 text-sm font-bold ${l === 'Medium' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 dark:border-gray-600 text-gray-500'}`}>{l}</button>
            ))}
             <button className="py-3 rounded-lg border-2 border-accent-yellow bg-accent-yellow/10 text-accent-yellow text-sm font-bold">National Exam</button>
          </div>
        </div>

        {/* Count */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
           <div className="flex justify-between mb-4">
             <h3 className="font-bold">Number of Questions</h3>
             <span className="text-primary font-bold text-lg">20</span>
           </div>
           <input type="range" min="5" max="50" defaultValue="20" className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
           <div className="flex justify-between text-xs text-gray-400 mt-2">
             <span>5</span>
             <span>50</span>
           </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-20">
        <button onClick={() => navigate(AppRoute.GroupStudy)} className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30">Start Quiz</button>
      </div>
    </div>
  );
};

export default QuestionGen;