import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const Materials: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 dark:border-gray-800 bg-background-light/95 px-4 backdrop-blur-sm dark:bg-background-dark/95">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">Biology</h1>
        <button className="flex w-10 shrink-0 items-center justify-end text-primary font-bold">EN</button>
      </header>

      <main className="flex-1 px-4 py-4 pb-24">
        {/* Search */}
        <div className="mb-4">
          <div className="flex w-full items-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-12 px-3 gap-2">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-base" placeholder="Search textbooks & articles..." />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 pb-4 overflow-x-auto no-scrollbar">
          <button className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary pl-4 pr-3 text-white text-sm font-medium">
            Grade 12 <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          {['Unit', 'Official'].map((l) => (
            <button key={l} className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-4 pr-3 text-sm font-medium">
              {l} <span className="material-symbols-outlined text-lg text-gray-400">expand_more</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {[
            { title: 'Biology Textbook', sub: 'Grade 12, Unit 3', type: 'Official', icon: 'auto_stories', action: 'View', color: 'primary' },
            { title: 'Cellular Respiration', sub: 'Summary Notes', type: 'Community', icon: 'article', action: 'Download', color: 'yellow' },
            { title: 'Biology Textbook', sub: 'Grade 12, Unit 4', type: 'Official', icon: 'auto_stories', action: 'View', color: 'primary' },
            { title: 'Photosynthesis Diagram', sub: 'Community Infographic', type: 'Community', icon: 'image', action: 'Done', color: 'green', done: true },
          ].map((item, i) => (
            <div key={i} onClick={() => navigate(AppRoute.Revision)} className="flex items-center gap-4 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer">
              <div className={`flex size-12 items-center justify-center rounded-lg bg-${item.done ? 'green-100 text-green-600' : item.color === 'yellow' ? 'yellow-100 text-yellow-600' : 'primary/10 text-primary'}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold line-clamp-1">{item.title}</p>
                <p className="text-sm text-gray-500 line-clamp-1">{item.sub}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${item.type === 'Official' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.type}
                </span>
              </div>
              {item.done ? (
                <div className="flex items-center gap-1 text-green-600">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="font-bold">Done</span>
                </div>
              ) : (
                <button className={`font-bold ${item.color === 'yellow' ? 'text-yellow-600' : 'text-primary'}`}>{item.action}</button>
              )}
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-24 right-6 z-20">
        <button onClick={() => navigate(AppRoute.Analyzer)} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Materials;