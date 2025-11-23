import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Analyzer: React.FC = () => {
  const navigate = useNavigate();
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="flex-1 text-center font-bold">Question Analyzer</h1>
        <span className="text-primary font-bold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Amh</span>
      </header>

      <main className="flex-1 p-4">
        {!analyzed ? (
           <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center gap-4 mt-8 bg-white dark:bg-gray-800">
             <h2 className="text-lg font-bold">Upload Your Question Bank</h2>
             <p className="text-center text-gray-500 text-sm">Drag and drop a PDF or tap to analyze.</p>
             <button onClick={() => setAnalyzed(true)} className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-green-600 transition-colors">Upload PDF</button>
           </div>
        ) : (
           <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center pt-4">2015 E.C. Grade 12 National Exam</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                 {[
                   {l: 'Total Questions', v: '120'},
                   {l: 'Subjects', v: '4'},
                   {l: 'Avg Difficulty', v: 'Medium'}
                 ].map((s, i) => (
                   <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                     <p className="text-xs text-gray-500">{s.l}</p>
                     <p className="text-xl font-bold">{s.v}</p>
                   </div>
                 ))}
              </div>

              {/* Topics */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <h3 className="font-bold mb-3">Topic Frequency</h3>
                 <div className="space-y-3">
                   {[
                     {n: 'Biology: Genetics', v: 25},
                     {n: 'Physics: Optics', v: 20},
                     {n: 'Chemistry: Acids', v: 18}
                   ].map((t, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-sm mb-1">
                         <span>{t.n}</span>
                         <span className="text-gray-500">{t.v}%</span>
                       </div>
                       <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{width: `${t.v}%`}}></div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Predicted */}
              <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-800">
                 <div className="flex gap-2 items-center text-orange-500 mb-2">
                   <span className="material-symbols-outlined">model_training</span>
                   <h3 className="font-bold">Predicted Concepts</h3>
                 </div>
                 <ul className="list-disc pl-5 text-sm space-y-1 opacity-80">
                   <li>Mendelian inheritance patterns.</li>
                   <li>Calculation of lens focal length.</li>
                   <li>Reaction rates in chemical equilibrium.</li>
                 </ul>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Analyzer;