import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      label: 'Today\'s Doses',
      value: `${stats?.completedToday}/${stats?.totalToday}`,
      icon: 'Pill',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'On Time',
      value: `${stats?.onTimePercentage}%`,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Missed This Week',
      value: stats?.missedThisWeek,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Streak Days',
      value: stats?.streakDays,
      icon: 'Flame',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {statItems?.map((item, index) => (
        <div key={index} className="glass-morphic rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={item?.icon} 
                size={16} 
                className={item?.color}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {item?.label}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{item?.value}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;