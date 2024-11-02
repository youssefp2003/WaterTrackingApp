import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from './AuthForm';
import { Dashboard } from './Dashboard';

export const AppContent: React.FC = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <AuthForm />;
};