import React from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="sticky top-0 bg-background-light dark:bg-background-dark p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 z-10">
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="font-bold text-xl">Leaderboard</h1>
        <span className="font-bold text-primary">Amh</span>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark sticky top-[60px] z-10">
        <div className="flex-1 text-center py-4 border-b-2 border-primary font-bold">Individual</div>
        <div className="flex-1 text-center py-4 text-gray-500">Group</div>
      </div>

      <div className="p-4 space-y-4">
        {/* Top 3 */}
        {[
          { rank: 1, name: 'Kenenisa Bekele', xp: '15,430', fire: 25, bg: 'bg-yellow-100 border-yellow-400', color: 'text-yellow-600' },
          { rank: 2, name: 'Tirunesh Dibaba', xp: '14,980', fire: 22, bg: 'bg-gray-200 border-gray-400', color: 'text-gray-600' },
          { rank: 3, name: 'Haile Gebrselassie', xp: '14,500', fire: 18, bg: 'bg-orange-100 border-orange-400', color: 'text-orange-600' },
        ].map((u) => (
          <div key={u.rank} className={`flex items-center gap-4 p-4 rounded-xl border ${u.bg}`}>
            <span className={`text-2xl font-black ${u.color}`}>#{u.rank}</span>
            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <p className="font-bold">{u.name}</p>
              <p className="text-primary text-sm font-bold">{u.xp} XP</p>
            </div>
            <div className="flex items-center text-orange-500 font-bold gap-1">
              <span className="material-symbols-outlined">local_fire_department</span>
              {u.fire}
            </div>
          </div>
        ))}

        {/* List */}
        {[4, 5, 6, 7].map((rank) => (
          <div key={rank} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <span className="text-lg font-bold text-gray-400">#{rank}</span>
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <p className="font-medium">Student Name</p>
              <p className="text-sm text-gray-500">12,000 XP</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Sticky User Rank */}
      <div className="fixed bottom-20 left-4 right-4 bg-blue-900 text-white p-4 rounded-xl flex items-center gap-4 shadow-xl z-20">
         <span className="text-2xl font-black">#24</span>
         <div className="h-12 w-12 rounded-full border-2 border-white bg-gray-400"></div>
         <div className="flex-1">
           <p className="font-bold">Your Rank</p>
           <p className="text-sm opacity-80">1,250 XP</p>
         </div>
         <div className="flex items-center gap-1 text-orange-400 font-bold">
            <span className="material-symbols-outlined">local_fire_department</span> 5
         </div>
      </div>
    </div>
  );
};

export default Leaderboard;