import React from 'react';
import { User } from '../types';

interface ProgressCircleProps {
  progress: number;
  todayTotal: number;
  user: User | null;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, todayTotal, user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="10"
              strokeDasharray={`${progress * 2.827} 282.7`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dy="0.3em"
              className="text-2xl font-bold"
              fill="#1F2937"
            >
              {Math.round(progress)}%
            </text>
          </svg>
        </div>
        <p className="text-gray-600 mb-2">Today's Progress</p>
        <p className="text-2xl font-bold text-gray-800">
          {todayTotal} / {user?.dailyGoal} {user?.preferredUnit}
        </p>
      </div>
    </div>
  );
};