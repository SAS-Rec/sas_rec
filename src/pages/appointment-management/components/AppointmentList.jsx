import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import AppointmentCard from './AppointmentCard';
import Button from '../../../components/ui/Button';

const AppointmentList = ({ 
  appointments = [], 
  selectedDate,
  onReschedule,
  onCancel,
  onViewDetails,
  className = '' 
}) => {
  const [viewMode, setViewMode] = useState('upcoming'); // upcoming, past, all

  const filterAppointments = () => {
    const now = new Date();
    let filtered = appointments;

    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered?.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate?.toDateString() === selectedDate?.toDateString();
      });
    }

    // Filter by view mode
    switch (viewMode) {
      case 'upcoming':
        return filtered?.filter(apt => new Date(apt.date) >= now);
      case 'past':
        return filtered?.filter(apt => new Date(apt.date) < now);
      default:
        return filtered;
    }
  };

  const filteredAppointments = filterAppointments();

  const getViewModeCount = (mode) => {
    const now = new Date();
    switch (mode) {
      case 'upcoming':
        return appointments?.filter(apt => new Date(apt.date) >= now)?.length;
      case 'past':
        return appointments?.filter(apt => new Date(apt.date) < now)?.length;
      default:
        return appointments?.length;
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return null;
    return selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with View Mode Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {selectedDate ? 'Appointments for' : 'Your Appointments'}
          </h2>
          {selectedDate && (
            <p className="text-sm text-muted-foreground mt-1">
              {formatSelectedDate()}
            </p>
          )}
        </div>
      </div>
      {/* View Mode Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
        {[
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'past', label: 'Past' },
          { key: 'all', label: 'All' }
        ]?.map(mode => (
          <button
            key={mode?.key}
            onClick={() => setViewMode(mode?.key)}
            className={`
              flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150
              ${viewMode === mode?.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            {mode?.label}
            <span className="ml-1 text-xs opacity-70">
              ({getViewModeCount(mode?.key)})
            </span>
          </button>
        ))}
      </div>
      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments?.length > 0 ? (
          filteredAppointments?.map(appointment => (
            <AppointmentCard
              key={appointment?.id}
              appointment={appointment}
              onReschedule={onReschedule}
              onCancel={onCancel}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <Icon 
                name={selectedDate ? "Calendar" : "CalendarX"} 
                size={24} 
                className="text-muted-foreground" 
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {selectedDate 
                ? 'No appointments on this date'
                : `No ${viewMode} appointments`
              }
            </h3>
            <p className="text-muted-foreground mb-4">
              {selectedDate
                ? 'Try selecting a different date or book a new appointment.'
                : `You don't have any ${viewMode} appointments at the moment.`
              }
            </p>
            {!selectedDate && viewMode === 'upcoming' && (
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Book New Appointment
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Quick Stats */}
      {filteredAppointments?.length > 0 && !selectedDate && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {getViewModeCount('upcoming')}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground mb-1">
              {getViewModeCount('past')}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;