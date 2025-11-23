import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Mathematics', progress: 75, icon: 'calculate', color: 'bg-primary' },
    { name: 'Biology', progress: 40, icon: 'biotech', color: 'bg-primary' },
    { name: 'Chemistry', progress: 90, icon: 'science', color: 'bg-primary' },
    { name: 'Physics', progress: 15, icon: 'rocket_launch', color: 'bg-primary' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* App Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/95 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjUtLKlRL3hO4usZxzxT_dtMfm7H9BQNkULj8gsfLJZ9vbVNwWrbFeQbluKBeMyYS3PDRmMmcrhkhIQN5znddSNr3eBBewX_NwB8pUkSzU9d5Y9xrAFDj7sGZr9Or2y0WCnF8IVuzgDnNqS_ifs3VzmxCzHnJbf0kmS4yUcWpph4w1UxTx-trv8JWLC7EywDxnqEMV2DocDDrY-zvXSn3auzrsIryCZEu0BQYciXT97AVbT_ANvHLFZVAF15iP7Ms4YM7uzS30vMo")'}}></div>
          <h1 className="text-lg font-bold">EthioLearn AI</h1>
        </div>
        <button className="text-primary font-bold">EN/አማ</button>
      </header>

      {/* Profile */}
      <div className="px-4 pt-2">
        <div className="flex items-center gap-4">
          <div className="bg-center bg-no-repeat bg-cover rounded-full h-20 w-20 shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpBNBhTZJJ5r-O3sXqtjq7xqRRbCEyOWCLOPsgYc_abxTz5UWXygJHKJnP_4fCsGIzThmhMK9yWDyWioZDK1NarlYdeBQ-DNRZ0cyt3GApklaOG2Th3SWlfLAFyzOByBTOG01VYXD8t3EqsWXw-TuiOXsvrPNoOhylsCJ2SvQ8j7muT1mzjap7uMSXiEKVeJEOBSiIU0oArQ-lWmI3l562mj_AGWt0JYb8dsXlGTckAADWLdXkKLvMXLYJnPKh-ixqnM6O__zG3-Q")'}}></div>
          <div className="flex flex-col">
            <p className="text-xl font-bold">Abebe Bikila</p>
            <p className="text-primary opacity-90">Grade 10</p>
            <div className="flex items-center gap-1 text-accent-yellow">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
              <span className="font-semibold text-black dark:text-white">5 day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div className="px-4">
        <div className="flex flex-col sm:flex-row items-center bg-accent-yellow/20 dark:bg-accent-yellow/10 rounded-2xl p-4 gap-4 border border-accent-yellow/30">
          <div className="flex-1 space-y-2">
            <p className="font-bold text-lg">National Exam in 25 days</p>
            <p className="text-primary text-sm">Stay focused and keep up the great work!</p>
            <button onClick={() => navigate(AppRoute.StudyPlan)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">View Plan</button>
          </div>
          <div className="w-full sm:w-32 h-32 rounded-xl bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBehba5Hy1PKhE-jpjusiOck8KiAW5-exmh1aIySIh7-3Oa9qLVGjqT9D2-jhPI3hnOFvaXLqMxASRAXxXBAKqR9mkKK8VI2Vf9K4uj0RXMfbw8Du14jHYozFLSojOkVmr0d9Tp3oYwy50ItcT-IWLqm84564YCdM2aZFnKfqfco1gdLe29G6HdlWlJAtAFDK9qFK6M4VEjD8WM9Bvm9jCVXrD3RmAhiD7Pa4oxHqc6yYANdl78U_3qlmNW4_Ku7yI8mxY1IBr4dZU")'}}></div>
        </div>
      </div>

      {/* Subjects Carousel */}
      <div>
        <div className="flex justify-between items-center px-4 pb-2 pt-2">
          <h2 className="text-xl font-bold">My Subjects</h2>
          <button onClick={() => navigate(AppRoute.Subjects)} className="text-primary text-sm font-bold">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {subjects.map((sub, i) => (
            <div key={i} onClick={() => navigate(AppRoute.Materials)} className="min-w-[160px] p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined">{sub.icon}</span>
              </div>
              <p className="font-bold mb-1">{sub.name}</p>
              <p className="text-xs text-gray-500 mb-2">{sub.progress}% Complete</p>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${sub.color}`} style={{width: `${sub.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proverb */}
      <div className="px-4">
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 flex flex-col sm:flex-row shadow-sm">
          <div className="h-40 sm:h-auto sm:w-32 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXw1avA6O0gJDCuwssIQEweoXX9ybwg3K3fohShY-0tzwQTixEwhGDmCAWo9mYEfvnah4uZ4Sp7iaRh3Cvz7CQt-BKpoeImNvFLLDe17ei3tcEqIYCbsqrdCRW7XpZJNWK9QQd56qV-V_D6VAcUXk9R_eFypaWuZxmC2MOxJqov8SzNCZPCJAKRf6Ws43VBohtYwiGFLdydGGLMspHcb4uWdym2Pvg72wpsX1P2QQtvrOAgpj-Dli1kR1Lo5DwMb_f8fyoS_etPT4")'}}></div>
          <div className="p-4 flex-1">
            <p className="text-primary text-xs font-bold uppercase mb-1">Proverb of the Day</p>
            <p className="font-bold text-lg">He who learns, teaches.</p>
            <p className="font-ethiopian text-gray-500 dark:text-gray-400 mt-1">የተማረ ያስተምራል።</p>
          </div>
        </div>
      </div>

      {/* Jump Back In */}
      <div className="px-4">
        <h2 className="text-xl font-bold mb-3">Jump Back In</h2>
        <div className="space-y-3">
          {[
            {icon: 'auto_stories', title: 'Textbook Chapter', subtitle: 'Chemistry: Chemical Bonds', route: AppRoute.Materials},
            {icon: 'quiz', title: 'Quiz', subtitle: 'Mathematics: Algebra II', route: AppRoute.QuestionGen},
            {icon: 'smart_toy', title: 'AI Tutor Chat', subtitle: 'Biology: Photosynthesis', route: AppRoute.AiTutor},
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.route)} className="w-full flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:scale-[1.01] transition-transform">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm sm:text-base">{item.title}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
              </div>
              <span className="material-symbols-outlined text-gray-400">arrow_forward_ios</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;