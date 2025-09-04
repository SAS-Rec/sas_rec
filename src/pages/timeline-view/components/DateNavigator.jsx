import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const DateNavigator = ({ selectedDate, onDateChange, className = '' }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    let newDate = new Date(selectedDate);
    newDate?.setDate(newDate?.getDate() + direction);
    onDateChange(newDate);
  };

  const setPresetDate = (preset) => {
    const today = new Date();
    let newDate = new Date();

    switch (preset) {
      case 'today':
        newDate = today;
        break;
      case 'yesterday':
        newDate?.setDate(today?.getDate() - 1);
        break;
      case 'week':
        newDate?.setDate(today?.getDate() - 7);
        break;
      case 'month':
        newDate?.setMonth(today?.getMonth() - 1);
        break;
      default:
        newDate = today;
    }

    onDateChange(newDate);
    setShowCalendar(false);
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  return (
    <div className={`glass-morphic rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Timeline Date</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCalendar(!showCalendar)}
          iconName="Calendar"
          iconSize={16}
        >
          Calendar
        </Button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDate(-1)}
          iconName="ChevronLeft"
          iconSize={16}
        />
        
        <div className="flex-1 text-center">
          <p className="text-sm font-medium text-foreground">
            {formatDate(selectedDate)}
          </p>
          {isToday(selectedDate) && (
            <p className="text-xs text-success font-medium">Today</p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDate(1)}
          iconName="ChevronRight"
          iconSize={16}
        />
      </div>
      {/* Quick Presets */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant={isToday(selectedDate) ? 'default' : 'outline'}
          size="sm"
          onClick={() => setPresetDate('today')}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPresetDate('yesterday')}
        >
          Yesterday
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPresetDate('week')}
        >
          Last Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPresetDate('month')}
        >
          Last Month
        </Button>
      </div>
      {/* Calendar Picker */}
      {showCalendar && (
        <div className="border-t border-white/10 pt-4">
          <input
            type="date"
            value={selectedDate?.toISOString()?.split('T')?.[0]}
            onChange={(e) => {
              let newDate = new Date(e.target.value);
              onDateChange(newDate);
              setShowCalendar(false);
            }}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default DateNavigator;