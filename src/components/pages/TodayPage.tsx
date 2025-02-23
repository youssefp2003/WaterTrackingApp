import React from 'react';
import { WaterProgress } from '../WaterProgress';
import { QuickAdd } from '../QuickAdd';
import { TodayLogs } from '../TodayLogs';

export const TodayPage: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-4 mb-20 space-y-4">
      <WaterProgress />
      <QuickAdd />
      <TodayLogs />
    </div>
  );
};