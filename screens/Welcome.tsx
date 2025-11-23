import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col bg-white dark:bg-background-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDAtgvfrJG5xCKPsQv6T4guRrwf2pTGqba2L8kCCm1acCu_F3Rk47jm4gFnoBxuMgAEiLqnCpI-hI4Jp1UtjxpbSHf_qGxYmjt9IfAqVlHyxPF1IwvAJ-_awpkWbro3EAMMkoBkJU5tEWrhOt5v7RoDzNWWl7Zj8-jEUli_-JLlj1Nbi2j_3jXZKOr9dKYC5UKI6znNwxJAHA6dy7scOl_j5sGuVM5cWALx6vz-7TAGu36bM0S9s7eYhv5DkJ4NI1JkUiVeDoMIYsc)'}}></div>
      
      <div className="relative flex flex-col h-full z-10">
        <header className="flex items-center justify-center p-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-primary">school</span>
            <span className="text-2xl font-extrabold text-text-light dark:text-text-dark">EthioLearn AI</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="w-full max-w-sm">
            <div 
              className="w-full bg-center bg-no-repeat bg-contain aspect-square mx-auto max-w-[280px]"
              style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvVwKyndjNCQBrV7pcBHBeLpjYGNjjX-PS7qF3eFMISAUVfguWWQ-c5kFoTYwXN1MmMvKQ9U6Hgf_Olcn7-GhBaN8fGLcXT9ej68dGj1AwYyCIdLlGJuJvm9I67ilQEKtxjVnQ3yTKK9anJ4bTbX_yqOHPA_KJwrxbr_NMZS75H1KZq1qX1K7BQb7np9YGr6L3932-fz54U2b9nBtfyCoTn06GSOEfahQCIigrz686hhVaAXECCeopBre8nC2QEFJFLGCB_t8lofE")'}}
            ></div>
            <h1 className="text-text-light dark:text-text-dark tracking-tight text-[28px] sm:text-[32px] font-bold leading-tight mt-6">
              Welcome to EthioLearn AI!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal mt-2">
              Your fun path to success.
            </p>
          </div>
        </main>

        <footer className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-md mx-auto">
          <div className="flex w-full gap-3 flex-col sm:flex-row items-stretch">
            <button className="flex flex-1 items-center justify-center rounded-lg h-14 px-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              English
            </button>
            <button className="flex flex-1 items-center justify-center rounded-lg h-14 px-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-ethiopian">
              አማርኛ
            </button>
          </div>
          <button 
            onClick={() => navigate(AppRoute.Dashboard)}
            className="flex items-center justify-center rounded-xl h-14 w-full bg-primary text-white text-lg font-bold shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-all"
          >
            Get Started
          </button>
          <div className="text-center pt-2">
            <a href="#" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary">
              Already have an account? Sign In
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Welcome;