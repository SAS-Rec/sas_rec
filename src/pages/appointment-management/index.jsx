import React, { useState } from 'react';

import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalFloatingActionButton from '../../components/ui/GlobalFloatingActionButton';
import RecordDetailSheet from '../../components/ui/RecordDetailSheet';
import AppointmentCalendar from './components/AppointmentCalendar';

import BookingFlow from './components/BookingFlow';
import AppointmentList from './components/AppointmentList';

const AppointmentManagement = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // calendar, list

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Smith",
      specialty: "Cardiology",
      facility: "Central Medical Center",
      address: "123 Main Street, Downtown Medical District, City 12345",
      phone: "(555) 123-4567",
      date: "2025-01-15T10:00:00",
      type: "in-person",
      status: "confirmed",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      notes: "Follow-up for blood pressure monitoring and medication adjustment."
    },
    {
      id: 2,
      doctorName: "Dr. Michael Johnson",
      specialty: "Dermatology",
      facility: "Riverside Clinic",
      address: "456 River Road, Riverside District, City 12346",
      phone: "(555) 234-5678",
      date: "2025-01-18T14:30:00",
      type: "video",
      status: "confirmed",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      notes: "Skin examination and mole check consultation via video call."
    },
    {
      id: 3,
      doctorName: "Dr. Emily Williams",
      specialty: "Endocrinology",
      facility: "Northside Hospital",
      address: "789 North Avenue, Northside Medical Complex, City 12347",
      phone: "(555) 345-6789",
      date: "2025-01-22T09:15:00",
      type: "in-person",
      status: "pending",
      coordinates: { lat: 40.7831, lng: -73.9712 },
      notes: "Diabetes management review and lab results discussion."
    },
    {
      id: 4,
      doctorName: "Dr. David Brown",
      specialty: "Gastroenterology",
      facility: "Central Medical Center",
      address: "123 Main Street, Downtown Medical District, City 12345",
      phone: "(555) 123-4567",
      date: "2024-12-20T11:00:00",
      type: "in-person",
      status: "completed",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      notes: "Routine colonoscopy screening - completed successfully."
    },
    {
      id: 5,
      doctorName: "Dr. Lisa Anderson",
      specialty: "Orthopedics",
      facility: "Sports Medicine Center",
      address: "321 Athletic Drive, Sports Complex, City 12348",
      phone: "(555) 456-7890",
      date: "2025-01-25T16:00:00",
      type: "in-person",
      status: "confirmed",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      notes: "Knee injury follow-up and physical therapy consultation."
    }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBookingComplete = (bookingData) => {
    console.log('New appointment booked:', bookingData);
    // Here you would typically add the new appointment to your state/API
  };

  const handleReschedule = (appointment) => {
    console.log('Reschedule appointment:', appointment);
    setSelectedAppointment(appointment);
    setIsBookingFlowOpen(true);
  };

  const handleCancel = (appointment) => {
    console.log('Cancel appointment:', appointment);
    // Here you would typically show a confirmation dialog
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailSheetOpen(true);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'calendar' ? 'list' : 'calendar');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-morphic border-b border-white/20 safe-area-top">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
              <p className="text-sm text-muted-foreground">
                Manage your healthcare appointments
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleViewMode}
                iconName={viewMode === 'calendar' ? 'List' : 'Calendar'}
                iconSize={16}
              >
                {viewMode === 'calendar' ? 'List' : 'Calendar'}
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsBookingFlowOpen(true)}
                iconName="Plus"
                iconSize={16}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <>
              {/* Calendar Component */}
              <AppointmentCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                appointments={appointments}
              />

              {/* Selected Date Info */}
              {selectedDate && (
                <div className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDate(null)}
                      iconName="X"
                      iconSize={14}
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {appointments?.filter(apt => {
                      const aptDate = new Date(apt.date);
                      return aptDate?.toDateString() === selectedDate?.toDateString();
                    })?.length} appointment(s) scheduled
                  </div>
                </div>
              )}
            </>
          )}

          {/* Appointments List */}
          <AppointmentList
            appointments={appointments}
            selectedDate={selectedDate}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            onViewDetails={handleViewDetails}
          />

          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsBookingFlowOpen(true)}
                iconName="Calendar"
                iconPosition="left"
                className="justify-start"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                iconName="Clock"
                iconPosition="left"
                className="justify-start"
              >
                View Timeline
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {appointments?.filter(apt => new Date(apt.date) > new Date())?.length}
              </div>
              <div className="text-xs text-muted-foreground">Upcoming</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {appointments?.filter(apt => apt?.status === 'confirmed')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Confirmed</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {appointments?.filter(apt => apt?.status === 'pending')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Flow Modal */}
      <BookingFlow
        isOpen={isBookingFlowOpen}
        onClose={() => {
          setIsBookingFlowOpen(false);
          setSelectedAppointment(null);
        }}
        onBookingComplete={handleBookingComplete}
      />
      {/* Appointment Detail Sheet */}
      <RecordDetailSheet
        isOpen={isDetailSheetOpen}
        onClose={() => {
          setIsDetailSheetOpen(false);
          setSelectedAppointment(null);
        }}
        recordData={selectedAppointment}
        recordType="appointment"
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Global FAB */}
      <GlobalFloatingActionButton />
    </div>
  );
};

export default AppointmentManagement;