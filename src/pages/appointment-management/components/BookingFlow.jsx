import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BookingFlow = ({ isOpen, onClose, onBookingComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    specialty: '',
    facility: '',
    doctor: '',
    date: '',
    time: '',
    type: 'in-person',
    notes: ''
  });

  const specialties = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'gastroenterology', label: 'Gastroenterology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' }
  ];

  const facilities = [
    { 
      value: 'central-medical', 
      label: 'Central Medical Center',
      description: '123 Main St, Downtown',
      availability: 'high'
    },
    { 
      value: 'riverside-clinic', 
      label: 'Riverside Clinic',
      description: '456 River Rd, Riverside',
      availability: 'medium'
    },
    { 
      value: 'northside-hospital', 
      label: 'Northside Hospital',
      description: '789 North Ave, Northside',
      availability: 'low'
    }
  ];

  const doctors = [
    { value: 'dr-smith', label: 'Dr. Sarah Smith', specialty: 'cardiology' },
    { value: 'dr-johnson', label: 'Dr. Michael Johnson', specialty: 'dermatology' },
    { value: 'dr-williams', label: 'Dr. Emily Williams', specialty: 'endocrinology' },
    { value: 'dr-brown', label: 'Dr. David Brown', specialty: 'gastroenterology' }
  ];

  const appointmentTypes = [
    { value: 'in-person', label: 'In-Person Visit' },
    { value: 'video', label: 'Video Consultation' },
    { value: 'phone', label: 'Phone Consultation' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleBooking = () => {
    console.log('Booking appointment:', bookingData);
    onBookingComplete(bookingData);
    onClose();
    setCurrentStep(1);
    setBookingData({
      specialty: '',
      facility: '',
      doctor: '',
      date: '',
      time: '',
      type: 'in-person',
      notes: ''
    });
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'high':
        return 'High Availability';
      case 'medium':
        return 'Limited Availability';
      case 'low':
        return 'Low Availability';
      default:
        return 'Check Availability';
    }
  };

  const filteredDoctors = doctors?.filter(doctor => 
    !bookingData?.specialty || doctor?.specialty === bookingData?.specialty
  );

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-200 ${className}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 md:max-w-2xl md:mx-auto">
        <div className="h-full glass-morphic rounded-2xl border border-white/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Book Appointment</h2>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3]?.map(step => (
                <div
                  key={step}
                  className={`
                    flex-1 h-2 rounded-full transition-colors duration-300
                    ${step <= currentStep ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Step 1: Specialty & Facility */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Choose Specialty & Facility
                  </h3>
                  
                  <div className="space-y-4">
                    <Select
                      label="Medical Specialty"
                      placeholder="Select specialty"
                      options={specialties}
                      value={bookingData?.specialty}
                      onChange={(value) => handleInputChange('specialty', value)}
                      required
                    />

                    <Select
                      label="Healthcare Facility"
                      placeholder="Select facility"
                      options={facilities?.map(facility => ({
                        ...facility,
                        label: (
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{facility?.label}</div>
                              <div className="text-xs text-muted-foreground">{facility?.description}</div>
                            </div>
                            <span className={`text-xs font-medium ${getAvailabilityColor(facility?.availability)}`}>
                              {getAvailabilityText(facility?.availability)}
                            </span>
                          </div>
                        )
                      }))}
                      value={bookingData?.facility}
                      onChange={(value) => handleInputChange('facility', value)}
                      required
                    />

                    <Select
                      label="Appointment Type"
                      options={appointmentTypes}
                      value={bookingData?.type}
                      onChange={(value) => handleInputChange('type', value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Select Doctor
                  </h3>
                  
                  <Select
                    label="Available Doctors"
                    placeholder="Choose your doctor"
                    options={filteredDoctors}
                    value={bookingData?.doctor}
                    onChange={(value) => handleInputChange('doctor', value)}
                    required
                  />

                  {bookingData?.doctor && (
                    <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {filteredDoctors?.find(d => d?.value === bookingData?.doctor)?.label}
                          </h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {filteredDoctors?.find(d => d?.value === bookingData?.doctor)?.specialty}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Select Date & Time
                  </h3>
                  
                  <div className="space-y-4">
                    <Input
                      label="Appointment Date"
                      type="date"
                      value={bookingData?.date}
                      onChange={(e) => handleInputChange('date', e?.target?.value)}
                      min={new Date()?.toISOString()?.split('T')?.[0]}
                      required
                    />

                    {bookingData?.date && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Available Time Slots
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots?.map(time => (
                            <button
                              key={time}
                              onClick={() => handleInputChange('time', time)}
                              className={`
                                p-2 rounded-lg text-sm font-medium transition-colors duration-150
                                ${bookingData?.time === time
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted/50 text-foreground hover:bg-muted'
                                }
                              `}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Input
                      label="Additional Notes (Optional)"
                      type="text"
                      placeholder="Any specific concerns or requests..."
                      value={bookingData?.notes}
                      onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                  iconPosition="left"
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                  className="flex-1"
                  disabled={
                    (currentStep === 1 && (!bookingData?.specialty || !bookingData?.facility)) ||
                    (currentStep === 2 && !bookingData?.doctor)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleBooking}
                  iconName="Check"
                  iconPosition="left"
                  className="flex-1"
                  disabled={!bookingData?.date || !bookingData?.time}
                >
                  Book Appointment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;