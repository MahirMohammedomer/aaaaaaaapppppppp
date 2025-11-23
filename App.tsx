import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AppRoute } from './types';

// Screens
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import SubjectSelect from './screens/SubjectSelect';
import Materials from './screens/Materials';
import QuestionGen from './screens/QuestionGen';
import AiTutor from './screens/AiTutor';
import GroupStudy from './screens/GroupStudy';
import Leaderboard from './screens/Leaderboard';
import Analyzer from './screens/Analyzer';
import StudyPlan from './screens/StudyPlan';
import Revision from './screens/Revision';
import Offline from './screens/Offline';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Welcome} element={<Welcome />} />
          <Route path={AppRoute.Dashboard} element={<Dashboard />} />
          <Route path={AppRoute.Subjects} element={<SubjectSelect />} />
          <Route path={AppRoute.Materials} element={<Materials />} />
          <Route path={AppRoute.QuestionGen} element={<QuestionGen />} />
          <Route path={AppRoute.AiTutor} element={<AiTutor />} />
          <Route path={AppRoute.GroupStudy} element={<GroupStudy />} />
          <Route path={AppRoute.Leaderboard} element={<Leaderboard />} />
          <Route path={AppRoute.Analyzer} element={<Analyzer />} />
          <Route path={AppRoute.StudyPlan} element={<StudyPlan />} />
          <Route path={AppRoute.Revision} element={<Revision />} />
          <Route path={AppRoute.Offline} element={<Offline />} />
          <Route path="*" element={<Navigate to={AppRoute.Login} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;