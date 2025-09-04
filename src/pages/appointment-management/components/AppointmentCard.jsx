import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCard = ({ appointment, onReschedule, onCancel, onViewDetails, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'phone':
        return 'Phone';
      case 'in-person':
        return 'MapPin';
      default:
        return 'Calendar';
    }
  };

  const isUpcoming = () => {
    return new Date(appointment.date) > new Date();
  };

  return (
    <div className={`bg-card rounded-2xl border border-border overflow-hidden ${className}`}>
      {/* Main Card Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Doctor Avatar */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={20} className="text-primary" />
          </div>

          {/* Appointment Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-base">
                  {appointment?.doctorName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {appointment?.specialty}
                </p>
              </div>
              
              {/* Status Badge */}
              <span className={`
                px-2 py-1 rounded-lg text-xs font-medium capitalize
                ${getStatusColor(appointment?.status)}
              `}>
                {appointment?.status}
              </span>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                <Icon name="Calendar" size={14} />
                <span className="font-medium">{formatDate(appointment?.date)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                <Icon name="Clock" size={14} />
                <span className="font-medium">{formatTime(appointment?.date)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon name={getTypeIcon(appointment?.type)} size={14} />
                <span className="capitalize">{appointment?.type}</span>
              </div>
            </div>

            {/* Facility Info */}
            <div className="flex items-center gap-2 mb-3">
              <Icon name="MapPin" size={14} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground truncate">
                {appointment?.facility}
              </span>
            </div>

            {/* Action Buttons */}
            {isUpcoming() && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReschedule(appointment)}
                  iconName="Calendar"
                  iconSize={14}
                >
                  Reschedule
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  iconSize={14}
                >
                  Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/20">
          <div className="space-y-3">
            {/* Full Address */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Location</h4>
              <p className="text-sm text-muted-foreground">{appointment?.address}</p>
            </div>

            {/* Map Thumbnail */}
            <div className="h-24 rounded-lg overflow-hidden bg-muted">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={appointment?.facility}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${appointment?.coordinates?.lat},${appointment?.coordinates?.lng}&z=15&output=embed`}
                className="border-0"
              />
            </div>

            {/* Contact Info */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Contact</h4>
                <p className="text-sm text-muted-foreground font-mono">{appointment?.phone}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconSize={14}
              >
                Call
              </Button>
            </div>

            {/* Notes */}
            {appointment?.notes && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Notes</h4>
                <p className="text-sm text-muted-foreground">{appointment?.notes}</p>
              </div>
            )}

            {/* Additional Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(appointment)}
                iconName="Eye"
                iconSize={14}
                className="flex-1"
              >
                View Full Details
              </Button>
              {isUpcoming() && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancel(appointment)}
                  iconName="X"
                  iconSize={14}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;