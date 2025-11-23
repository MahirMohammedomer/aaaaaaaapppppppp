export interface User {
  name: string;
  grade: string;
  avatar: string;
  streak: number;
}

export interface Subject {
  id: string;
  name: string;
  nameAmh: string;
  progress: number;
  icon: string;
  color: string;
  bg: string;
  border: string;
  darkBg: string;
  darkBorder: string;
  iconBg: string;
  iconColor: string;
  textNormal: string;
  darkTextNormal: string;
  strokeColor: string;
  darkStrokeColor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppRoute {
  Login = '/',
  Welcome = '/welcome',
  Dashboard = '/dashboard',
  Subjects = '/subjects',
  Materials = '/materials',
  QuestionGen = '/generate-questions',
  AiTutor = '/ai-tutor',
  GroupStudy = '/group-study',
  Leaderboard = '/leaderboard',
  Analyzer = '/analyzer',
  StudyPlan = '/study-plan',
  Revision = '/revision',
  Offline = '/offline',
}
