import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointmentsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Cardiologist",
      facility: "Heart Care Medical Center",
      date: "2025-01-08",
      time: "10:30 AM",
      type: "Follow-up",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      location: {
        address: "123 Medical Plaza, Suite 200",
        distance: "2.3 miles"
      }
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      facility: "Diabetes & Wellness Clinic",
      date: "2025-01-10",
      time: "02:15 PM",
      type: "Consultation",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      location: {
        address: "456 Health Boulevard",
        distance: "1.8 miles"
      }
    },
    {
      id: 3,
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      facility: "Family Health Associates",
      date: "2025-01-15",
      time: "09:00 AM",
      type: "Annual Checkup",
      avatar: "https://images.unsplash.com/photo-1594824475317-d8b5b6b3e6e4?w=150&h=150&fit=crop&crop=face",
      location: {
        address: "789 Wellness Drive",
        distance: "3.1 miles"
      }
    }
  ];

  const nextAppointment = () => {
    setCurrentIndex((prev) => (prev + 1) % appointments?.length);
  };

  const prevAppointment = () => {
    setCurrentIndex((prev) => (prev - 1 + appointments?.length) % appointments?.length);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    if (date?.toDateString() === today?.toDateString()) {
      return "Today";
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return "Tomorrow";
    } else {
      return date?.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'follow-up':
        return 'bg-accent/10 text-accent';
      case 'consultation':
        return 'bg-secondary/10 text-secondary';
      case 'annual checkup':
        return 'bg-success/10 text-success';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  if (appointments?.length === 0) {
    return (
      <div className="glass-morphic rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Appointments</h2>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Appointments Scheduled</h3>
          <p className="text-muted-foreground mb-4">Schedule your next appointment to stay on top of your health.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Schedule Appointment
          </Button>
        </div>
      </div>
    );
  }

  const currentAppointment = appointments?.[currentIndex];

  return (
    <div className="glass-morphic rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Upcoming Appointments</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {appointments?.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={prevAppointment}
              className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors duration-150"
              disabled={appointments?.length <= 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextAppointment}
              className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors duration-150"
              disabled={appointments?.length <= 1}
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-start gap-4">
          {/* Doctor Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img
              src={currentAppointment?.avatar}
              alt={currentAppointment?.doctorName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{currentAppointment?.doctorName}</h3>
                <p className="text-sm text-muted-foreground">{currentAppointment?.specialty}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(currentAppointment?.type)}`}>
                {currentAppointment?.type}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{currentAppointment?.facility}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-foreground font-medium">{formatDate(currentAppointment?.date)}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground font-mono">{currentAppointment?.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{currentAppointment?.location?.address}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-accent font-medium">{currentAppointment?.location?.distance}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="Phone" iconPosition="left" className="flex-1">
            Call
          </Button>
          <Button variant="outline" size="sm" iconName="Navigation" iconPosition="left" className="flex-1">
            Directions
          </Button>
          <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left" className="flex-1">
            Reschedule
          </Button>
        </div>
      </div>
      {/* Dots Indicator */}
      {appointments?.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {appointments?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointmentsCarousel;