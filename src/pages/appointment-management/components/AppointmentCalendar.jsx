import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentCalendar = ({ selectedDate, onDateSelect, appointments = [], className = '' }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const currentYear = currentMonth?.getFullYear();
  const currentMonthIndex = currentMonth?.getMonth();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
  const firstDayWeekday = firstDayOfMonth?.getDay();
  const daysInMonth = lastDayOfMonth?.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's trailing days
  const prevMonth = new Date(currentYear, currentMonthIndex - 1, 0);
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays?.push({
      date: prevMonth?.getDate() - i,
      isCurrentMonth: false,
      fullDate: new Date(currentYear, currentMonthIndex - 1, prevMonth.getDate() - i)
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays?.push({
      date: day,
      isCurrentMonth: true,
      fullDate: new Date(currentYear, currentMonthIndex, day)
    });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays?.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays?.push({
      date: day,
      isCurrentMonth: false,
      fullDate: new Date(currentYear, currentMonthIndex + 1, day)
    });
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const getAppointmentCount = (date) => {
    return appointments?.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate?.toDateString() === date?.toDateString();
    })?.length;
  };

  const isToday = (date) => {
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`bg-card rounded-2xl border border-border p-4 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentMonthIndex]} {currentYear}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors duration-150"
            aria-label="Previous month"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors duration-150"
            aria-label="Next month"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays?.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays?.map((day, index) => {
          const appointmentCount = getAppointmentCount(day?.fullDate);
          const hasAppointments = appointmentCount > 0;
          
          return (
            <button
              key={index}
              onClick={() => onDateSelect(day?.fullDate)}
              disabled={!day?.isCurrentMonth}
              className={`
                relative aspect-square flex items-center justify-center text-sm rounded-lg
                transition-all duration-150 hover:scale-105 active:scale-95
                ${day?.isCurrentMonth 
                  ? 'text-foreground hover:bg-muted/50' 
                  : 'text-muted-foreground/50 cursor-not-allowed'
                }
                ${isToday(day?.fullDate) 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : ''
                }
                ${isSelected(day?.fullDate) && !isToday(day?.fullDate)
                  ? 'bg-accent text-accent-foreground font-medium'
                  : ''
                }
              `}
            >
              <span className="relative z-10">{day?.date}</span>
              {/* Appointment Indicator */}
              {hasAppointments && day?.isCurrentMonth && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`
                    w-1.5 h-1.5 rounded-full
                    ${isToday(day?.fullDate) || isSelected(day?.fullDate)
                      ? 'bg-current opacity-70' :'bg-primary'
                    }
                  `} />
                  {appointmentCount > 1 && (
                    <div className={`
                      absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full text-xs flex items-center justify-center
                      ${isToday(day?.fullDate) || isSelected(day?.fullDate)
                        ? 'bg-current text-primary' :'bg-primary text-primary-foreground'
                      }
                    `}>
                      {appointmentCount > 9 ? '9+' : appointmentCount}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>Has Appointments</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;