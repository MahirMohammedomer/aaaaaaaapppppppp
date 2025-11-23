import React from 'react';
import { useNavigate } from 'react-router-dom';

const Revision: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10">
        <span className="material-symbols-outlined">menu</span>
        <h1 className="flex-1 text-center font-bold">Revision Tools</h1>
        <span className="material-symbols-outlined">language</span>
      </header>

      <main className="flex-1 p-4 pb-24">
        {/* Search */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-12 flex items-center px-4 gap-2 mb-4">
          <span className="material-symbols-outlined text-gray-500">search</span>
          <input className="bg-transparent flex-1 outline-none" placeholder="Search notes, flashcards..." />
        </div>

        {/* Tabs */}
        <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-xl flex mb-4">
          {['Notes', 'Flashcards', 'Mind Maps'].map((t, i) => (
            <button key={t} className={`flex-1 py-2 text-sm font-medium rounded-lg ${i === 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-500'}`}>{t}</button>
          ))}
        </div>

        {/* Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
           <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"><span className="material-symbols-outlined text-lg">checklist</span> All</button>
           {['Biology', 'Chemistry', 'Physics', 'Math'].map(s => (
             <button key={s} className="bg-gray-200 dark:bg-gray-800 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap">
               <span className="material-symbols-outlined text-lg">science</span> {s}
             </button>
           ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold">Cellular Respiration</h3>
            <p className="text-sm text-gray-500 mt-1">A deck of 25 cards covering the key stages.</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Biology, Chapter 4</span>
              <span className="text-xs text-gray-400">Oct 26</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold">Periodic Table</h3>
            <p className="text-sm text-gray-500 mt-1">Flashcards for the first 20 elements.</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Chemistry, Chapter 2</span>
              <span className="text-xs text-gray-400">Oct 24</span>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-24 right-6 z-20">
         <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"><span className="material-symbols-outlined">add</span></button>
      </div>
    </div>
  );
};

export default Revision;