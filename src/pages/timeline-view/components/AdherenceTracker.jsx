import React from 'react';
import Icon from '../../../components/AppIcon';

const AdherenceTracker = ({ adherenceData, className = '' }) => {
  const { percentage, trend, weeklyData } = adherenceData;

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className={`glass-morphic rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Medication Adherence</h2>
        <div className="flex items-center gap-2">
          <Icon 
            name={getTrendIcon()} 
            size={16} 
            className={getTrendColor()}
          />
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="2"
              strokeDasharray={`${percentage}, 100`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-foreground">{percentage}%</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">This Week</p>
          <p className="text-2xl font-bold text-foreground">{percentage}%</p>
          <p className="text-sm text-muted-foreground">
            {Math.round((percentage / 100) * 21)} of 21 doses taken
          </p>
        </div>
      </div>
      {/* Mini Sparkline */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">7-Day Trend</span>
          <span className="text-xs text-muted-foreground">Daily %</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          {weeklyData?.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-success/20 rounded-sm relative overflow-hidden"
            >
              <div
                className="bg-success rounded-sm transition-all duration-300"
                style={{ height: `${(value / 100) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default AdherenceTracker;