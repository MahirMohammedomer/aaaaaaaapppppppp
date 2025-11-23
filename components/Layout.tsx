import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Routes where we don't want the bottom nav
  const hideNavRoutes = [AppRoute.Login, AppRoute.Welcome, AppRoute.AiTutor, AppRoute.GroupStudy];
  const showNav = !hideNavRoutes.includes(location.pathname as AppRoute);

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', route: AppRoute.Dashboard },
    { icon: 'menu_book', label: 'Textbooks', route: AppRoute.Subjects },
    { icon: 'smart_toy', label: 'AI Tutor', route: AppRoute.AiTutor },
    { icon: 'groups', label: 'Groups', route: AppRoute.Leaderboard }, // Using Leaderboard as entry to groups
    { icon: 'person', label: 'Profile', route: AppRoute.Offline }, // Using Offline as profile/settings placeholder
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display overflow-x-hidden">
      <div className={`flex-1 ${showNav ? 'pb-20' : ''}`}>
        {children}
      </div>
      
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/90">
          <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className={`flex w-full flex-col items-center justify-center gap-1 rounded-lg py-2 transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-500 hover:text-primary dark:text-slate-400'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`} style={{fontVariationSettings: `'FILL' ${isActive ? 1 : 0}`}}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;