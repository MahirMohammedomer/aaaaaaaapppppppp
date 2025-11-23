import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'Login' | 'Register'>('Login');

  const handleLogin = () => {
    navigate(AppRoute.Welcome);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center overflow-x-hidden p-4 bg-background-light dark:bg-background-dark">
      <div className="flex w-full max-w-md flex-col">
        {/* Language Toggle */}
        <div className="flex justify-end pt-4 pb-6">
          <button className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-base">language</span>
            <span>English</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
        </div>
        
        {/* Header */}
        <div className="flex w-full items-center justify-center pt-8 pb-4">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-green-400 flex items-center justify-center shadow-lg shadow-green-500/30">
            <span className="material-symbols-outlined text-4xl text-white">school</span>
          </div>
        </div>
        
        <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl font-bold leading-tight px-4 text-center pb-2">
          Welcome to EthioLearn AI
        </h1>
        <p className="font-ethiopian text-subtle-light dark:text-subtle-dark text-lg font-normal leading-normal text-center">
          እንኳን ወደ ኢትዮLearn በደህና መጡ
        </p>
        
        {/* Toggle */}
        <div className="flex px-4 py-8">
          <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            {['Login', 'Register'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-semibold leading-normal transition-all ${
                  mode === m 
                    ? 'bg-white dark:bg-gray-900 shadow-sm text-text-light dark:text-text-dark' 
                    : 'text-subtle-light dark:text-subtle-dark hover:text-gray-600'
                }`}
              >
                <span className="truncate">{m}</span>
                <span className="truncate font-ethiopian ml-1">{m === 'Login' ? '/ ግባ' : '/ ይመዝገቡ'}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <div className="flex w-full flex-col gap-4 px-4">
          <label className="flex flex-col w-full">
            <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
              Email or Phone / <span className="font-ethiopian">ኢሜይል / ስልክ</span>
            </p>
            <div className="relative flex w-full flex-1 items-stretch">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark">alternate_email</span>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark pl-12 pr-4 text-base font-normal leading-normal" 
                placeholder="Enter your email or phone" 
              />
            </div>
          </label>
          
          <label className="flex flex-col w-full">
            <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
              Password / <span className="font-ethiopian">የይለፍ ቃል</span>
            </p>
            <div className="relative flex w-full flex-1 items-stretch">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark">lock</span>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark pl-12 pr-12 text-base font-normal leading-normal" 
                placeholder="Enter your password" 
                type="password" 
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark">
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </label>
          
          <div className="flex justify-end pt-1">
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Forgot Password? / <span className="font-ethiopian">የይለፍ ቃል ረሱ?</span>
            </a>
          </div>
        </div>
        
        {/* CTA */}
        <div className="px-4 pt-6 pb-8">
          <button 
            onClick={handleLogin}
            className="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors"
          >
            Log In / <span className="font-ethiopian ml-1">ግባ</span>
          </button>
        </div>
        
        {/* Social */}
        <div className="flex w-full flex-col items-center gap-4 px-4">
          <div className="flex w-full items-center gap-4">
            <hr className="w-full border-t border-gray-200 dark:border-gray-700"/>
            <p className="text-sm text-subtle-light dark:text-subtle-dark whitespace-nowrap">Or continue with</p>
            <hr className="w-full border-t border-gray-200 dark:border-gray-700"/>
          </div>
          <div className="flex w-full items-center justify-center gap-4 py-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <img alt="Google" className="h-6 w-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD5deVldZ-Zcz4MC9T_l60b_hZ5atLCVQAelASMXCoRkZrFa0d_AVpj1nob5jXxQDPQ3zfVMDOL7gLmBaFbxMMkQbKNfHk7vu4psgalkkI7hY5636Vj7JOdOZPHOxez2GAgHC6aLxiCI_OjkpVCPKSK67bnI2fooNGPhKVU7GJZ6UDSfufzCxItfzmwtMBwJ547ocyxI-Gm37kBNBRT1xqOQQbjxxPaqJTuFhYmQwcdPn6cn3BFE5JtBoMkdbOeDvBLIDuMFBG7sg"/>
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <img alt="Apple" className="h-6 w-6 dark:invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXF-8DI2FZNGdjXC1nP80FpBIIJlXpv-TwGx8Z2ULJ9jUTfntcUWs5mnPaJw65LCGXK1SrSziroQLD44xxfx66sly-O2g5NM9SucT1FG7XyOgmnHKmb9hEcCBifYD9JDKScs-dmNPp7o9oxAfvRwIetT_2o0LgtGS-piC7h31C-uKJkdDkpMil1Zlp0OELn9svzSeP_mYl9e98MwF275MnzE7MkBnAIv9Jb4bQ-PRou1QI8CYztMvhPwihQTaEqvBjJTCKgjU5gDk"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;