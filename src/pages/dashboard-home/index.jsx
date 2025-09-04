import React, { useState, useEffect } from 'react';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalFloatingActionButton from '../../components/ui/GlobalFloatingActionButton';
import WelcomeSection from './components/WelcomeSection';
import TodaysMedicationsTimeline from './components/TodaysMedicationsTimeline';
import UpcomingAppointmentsCarousel from './components/UpcomingAppointmentsCarousel';
import RecentRecordsList from './components/RecentRecordsList';
import PullToRefresh from './components/PullToRefresh';
import SkeletonLoader from './components/SkeletonLoader';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate data refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastRefresh(new Date());
    setIsLoading(false);
  };

  // Auto-refresh data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-20 safe-area-top">
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="px-4 py-6">
            {isLoading ? (
              <>
                <SkeletonLoader type="welcome" />
                <SkeletonLoader type="medication" />
                <SkeletonLoader type="appointment" />
                <SkeletonLoader type="records" />
              </>
            ) : (
              <>
                {/* Welcome Section */}
                <WelcomeSection 
                  userName="Sarah"
                  profileCompletion={85}
                />

                {/* Today's Medications Timeline */}
                <TodaysMedicationsTimeline />

                {/* Upcoming Appointments Carousel */}
                <UpcomingAppointmentsCarousel />

                {/* Recent Records List */}
                <RecentRecordsList />

                {/* Last Refresh Indicator */}
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {lastRefresh?.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </>
            )}
          </div>
        </PullToRefresh>
      </div>
      {/* Global Floating Action Button */}
      <GlobalFloatingActionButton />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default DashboardHome;