import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalFloatingActionButton from '../../components/ui/GlobalFloatingActionButton';
import AdherenceTracker from './components/AdherenceTracker';
import DateNavigator from './components/DateNavigator';
import TimelineList from './components/TimelineList';
import QuickStats from './components/QuickStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TimelineView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock adherence data
  const adherenceData = {
    percentage: 87,
    trend: 5,
    weeklyData: [85, 90, 78, 95, 88, 92, 87]
  };

  // Mock quick stats
  const quickStats = {
    completedToday: 4,
    totalToday: 5,
    onTimePercentage: 92,
    missedThisWeek: 2,
    streakDays: 12
  };

  // Mock timeline entries
  const mockTimelineEntries = [
    {
      id: 1,
      type: 'medication',
      title: 'Metformin',
      dosage: '500mg',
      time: '08:00',
      status: 'completed',
      completedAt: '08:15',
      notes: 'Take with breakfast'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Lisinopril',
      dosage: '10mg',
      time: '08:30',
      status: 'completed',
      completedAt: '08:30',
      notes: 'Blood pressure medication'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Cardiology Checkup',
      time: '10:00',
      status: 'completed',
      doctor: 'Sarah Johnson',
      notes: 'Regular heart health monitoring'
    },
    {
      id: 4,
      type: 'medication',
      title: 'Vitamin D3',
      dosage: '2000 IU',
      time: '12:00',
      status: 'completed',
      completedAt: '12:10',
      notes: 'Take with lunch'
    },
    {
      id: 5,
      type: 'medication',
      title: 'Metformin',
      dosage: '500mg',
      time: '18:00',
      status: 'upcoming',
      notes: 'Take with dinner'
    },
    {
      id: 6,
      type: 'medication',
      title: 'Atorvastatin',
      dosage: '20mg',
      time: '22:00',
      status: 'upcoming',
      notes: 'Take before bedtime'
    }
  ];

  const [timelineEntries, setTimelineEntries] = useState(mockTimelineEntries);

  const handleStatusChange = (entryId, newStatus) => {
    setTimelineEntries(prev => 
      prev?.map(entry => 
        entry?.id === entryId 
          ? { 
              ...entry, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date()?.toTimeString()?.slice(0, 5) : null
            }
          : entry
      )
    );
  };

  const handleSnooze = (entryId, duration) => {
    console.log(`Snoozing entry ${entryId} for ${duration} minutes`);
    // In a real app, this would set a new reminder time
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const formatSelectedDate = () => {
    const today = new Date();
    const isToday = selectedDate?.toDateString() === today?.toDateString();
    
    if (isToday) {
      return 'Today\'s Timeline';
    }
    
    return selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Timeline View - SAS Rec</title>
        <meta name="description" content="Track your medication adherence and appointment history with chronological timeline visualization" />
      </Helmet>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="gradient-ambient border-b border-white/10 safe-area-top">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Timeline View
                </h1>
                <p className="text-muted-foreground">
                  Track your health journey chronologically
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                iconName={refreshing ? 'Loader2' : 'RefreshCw'}
                iconSize={16}
                className={refreshing ? 'animate-spin' : ''}
              >
                Refresh
              </Button>
            </div>

            {/* Quick Stats */}
            <QuickStats stats={quickStats} className="mb-6" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Desktop */}
            <div className="lg:col-span-1 space-y-6">
              {/* Adherence Tracker */}
              <AdherenceTracker adherenceData={adherenceData} />
              
              {/* Date Navigator */}
              <DateNavigator 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>

            {/* Main Timeline */}
            <div className="lg:col-span-2">
              <div className="glass-morphic rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {formatSelectedDate()}
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {timelineEntries?.length} entries
                    </span>
                    <Icon name="Timeline" size={16} className="text-muted-foreground" />
                  </div>
                </div>

                {/* Timeline Entries */}
                <TimelineList
                  entries={timelineEntries}
                  onStatusChange={handleStatusChange}
                  onSnooze={handleSnooze}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Adherence Tracker - Only show on mobile */}
        <div className="lg:hidden px-4 pb-6">
          <AdherenceTracker adherenceData={adherenceData} />
        </div>
      </div>
      {/* Navigation */}
      <BottomTabNavigation />
      <GlobalFloatingActionButton />
    </>
  );
};

export default TimelineView;