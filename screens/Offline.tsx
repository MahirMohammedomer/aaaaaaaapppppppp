import React from 'react';
import { useNavigate } from 'react-router-dom';

const Offline: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="flex-1 text-center font-bold">Offline Mode</h1>
        <span className="font-bold text-sm">Amh</span>
      </header>

      <main className="flex-1 p-4 pb-24">
        <h2 className="text-2xl font-bold mb-4">Device Storage</h2>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">Used Storage</span>
            <span className="text-gray-500">1.8 GB / 5 GB</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[36%]"></div>
          </div>
        </div>

        <div className="space-y-3">
          <details className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700" open>
            <summary className="flex justify-between items-center p-4 cursor-pointer font-bold">
              Textbooks <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="px-4 pb-2 border-t border-gray-200 dark:border-gray-700">
               {[
                 {t: 'Grade 12 Physics', s: '210 MB', st: 'done'},
                 {t: 'Grade 11 Chemistry', s: '185 MB', st: 'load'},
                 {t: 'Grade 10 Biology', s: '150 MB', st: 'down'}
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex gap-3 items-center">
                       <div className="h-10 w-10 bg-blue-900/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                         <span className="material-symbols-outlined">book</span>
                       </div>
                       <div>
                         <p className="font-bold text-sm">{item.t}</p>
                         <p className="text-xs text-gray-500">{item.s}</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       {item.st === 'done' && <>
                          <span className="material-symbols-outlined text-green-500">check_circle</span>
                          <span className="material-symbols-outlined text-red-500">delete</span>
                       </>}
                       {item.st === 'load' && <span className="material-symbols-outlined text-gray-400 animate-spin">progress_activity</span>}
                       {item.st === 'down' && <span className="material-symbols-outlined text-blue-500">download_for_offline</span>}
                    </div>
                 </div>
               ))}
            </div>
          </details>
          
          <details className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
             <summary className="flex justify-between items-center cursor-pointer font-bold">
                My Notes <span className="material-symbols-outlined">expand_more</span>
             </summary>
          </details>
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-red-50 text-red-500 font-bold border border-red-100 flex items-center justify-center gap-2">
           <span className="material-symbols-outlined">delete_sweep</span> Delete All Downloads
        </button>
      </main>

      <div className="bg-blue-900 text-white p-4">
         <div className="flex gap-3">
            <span className="material-symbols-outlined text-yellow-400">sync</span>
            <div className="flex-1">
              <h3 className="font-bold">Automatic Sync</h3>
              <p className="text-xs opacity-80 mt-1">Your offline progress will automatically sync when you're back online.</p>
            </div>
            <span className="material-symbols-outlined opacity-50">close</span>
         </div>
      </div>
    </div>
  );
};

export default Offline;