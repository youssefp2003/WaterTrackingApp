import React from 'react';
import { Droplets } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';

export const WaterProgress: React.FC = () => {
  const { dailyGoal, getTodayTotal } = useWaterStore();
  const todayTotal = getTodayTotal();
  const progress = Math.min((todayTotal / dailyGoal) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="relative h-48 bg-blue-50 rounded-2xl overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-500 transition-all duration-700 ease-out"
          style={{ height: `${progress}%` }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-900">
          <Droplets size={36} className="mb-2" />
          <div className="text-2xl font-bold">{todayTotal}ml</div>
          <div className="text-sm opacity-75">of {dailyGoal}ml goal</div>
          <div className="text-lg font-semibold mt-1">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};