import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineEntry = ({ entry, onStatusChange, onSnooze, className = '' }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = () => {
    switch (entry?.status) {
      case 'completed':
        return 'CheckCircle2';
      case 'missed':
        return 'XCircle';
      case 'upcoming':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = () => {
    switch (entry?.status) {
      case 'completed':
        return 'text-success';
      case 'missed':
        return 'text-error';
      case 'upcoming':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = () => {
    switch (entry?.type) {
      case 'medication':
        return 'Pill';
      case 'appointment':
        return 'Calendar';
      case 'lab':
        return 'TestTube';
      default:
        return 'Activity';
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStatusToggle = () => {
    const newStatus = entry?.status === 'completed' ? 'pending' : 'completed';
    onStatusChange(entry?.id, newStatus);
  };

  const handleSnooze = (duration) => {
    onSnooze(entry?.id, duration);
    setShowActions(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
      {/* Entry Card */}
      <div className="flex gap-4 pb-6">
        {/* Time Marker */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className={`w-12 h-12 rounded-full bg-current/10 flex items-center justify-center ${getStatusColor()}`}>
            <Icon 
              name={getStatusIcon()} 
              size={20} 
              className="text-current"
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground mt-1">
            {formatTime(entry?.time)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 glass-morphic rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon 
                  name={getTypeIcon()} 
                  size={16} 
                  className="text-primary"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{entry?.title}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {entry?.type}
                </p>
              </div>
            </div>

            {entry?.type === 'medication' && entry?.status !== 'completed' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(!showActions)}
                iconName="MoreVertical"
                iconSize={16}
              />
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 mb-3">
            {entry?.dosage && (
              <div className="flex items-center gap-2">
                <Icon name="Pill" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground font-mono">{entry?.dosage}</span>
              </div>
            )}
            
            {entry?.notes && (
              <div className="flex items-start gap-2">
                <Icon name="FileText" size={14} className="text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">{entry?.notes}</span>
              </div>
            )}

            {entry?.doctor && (
              <div className="flex items-center gap-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Dr. {entry?.doctor}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          {entry?.type === 'medication' && (
            <div className="flex items-center gap-2">
              {entry?.status !== 'completed' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStatusToggle}
                  iconName="Check"
                  iconPosition="left"
                  iconSize={14}
                >
                  Mark Taken
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-success">
                  <Icon name="CheckCircle2" size={16} />
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-xs text-muted-foreground">
                    at {formatTime(entry?.completedAt || entry?.time)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Snooze Actions */}
          {showActions && entry?.status !== 'completed' && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-sm font-medium text-foreground mb-2">Snooze Reminder</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSnooze(15)}
                  iconName="Clock"
                  iconSize={14}
                >
                  15 min
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSnooze(60)}
                  iconName="Clock"
                  iconSize={14}
                >
                  1 hour
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEntry;