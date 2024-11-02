import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';

export const TodayLogs: React.FC = () => {
  const { logs, removeWaterLog, resetTodayLogs } = useWaterStore();
  
  const todayLogs = logs.filter(
    (log) =>
      new Date(log.timestamp).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-3">Today's Logs</h2>
      <div className="space-y-2">
        {todayLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
          >
            <div>
              <span className="font-medium">{log.amount}ml</span>
              <span className="text-sm text-gray-500 ml-2">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={() => removeWaterLog(log.id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {todayLogs.length === 0 && (
          <p className="text-center text-gray-500">No logs for today</p>
        )}
      </div>
      
      {todayLogs.length > 0 && (
        <button
          onClick={resetTodayLogs}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <RefreshCw size={20} />
          Reset Today's Intake
        </button>
      )}
    </div>
  );
};