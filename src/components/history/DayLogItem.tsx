import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface DayLogItemProps {
  date: string;
  total: number;
  logs: { time: string; amount: number }[];
  dailyGoal: number;
  maxValue: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DayLogItem: React.FC<DayLogItemProps> = ({
  date,
  total,
  logs,
  dailyGoal,
  maxValue,
  isExpanded,
  onToggle,
}) => {
  const height = (total / maxValue) * 100;
  const isToday = date === format(new Date(), 'EEE');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full" />
            <div
              className={`absolute bottom-0 w-full rounded-full ${
                isToday ? 'bg-blue-500' : 'bg-blue-200'
              }`}
              style={{ height: `${height}%` }}
            />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">{date}</div>
            <div className="text-sm text-gray-600">
              {(total / 1000).toFixed(1)}L of {(dailyGoal / 1000).toFixed(1)}L
            </div>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-600">{log.time}</span>
              <span className="font-medium">{log.amount}ml</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              No logs for this day
            </p>
          )}
        </div>
      )}
    </div>
  );
};