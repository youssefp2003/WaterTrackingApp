<<<<<<< HEAD
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from './AuthForm';
import { Dashboard } from './Dashboard';

export const AppContent: React.FC = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <AuthForm />;
=======
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from './AuthForm';
import { Navigation } from './Navigation';
import { TodayPage } from './pages/TodayPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { Header } from './dashboard/Header';

export const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('today');

  if (!user) return <AuthForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={user.username} onLogout={logout} />

      {currentPage === 'today' && <TodayPage />}
      {currentPage === 'history' && <HistoryPage />}
      {currentPage === 'settings' && <SettingsPage />}

      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
>>>>>>> 8be8f0c (pre-workign-notif)
};