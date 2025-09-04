import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = "Sarah", profileCompletion = 85 }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getCompletionColor = () => {
    if (profileCompletion >= 80) return "text-success";
    if (profileCompletion >= 60) return "text-warning";
    return "text-error";
  };

  const getCompletionBgColor = () => {
    if (profileCompletion >= 80) return "bg-success/10";
    if (profileCompletion >= 60) return "bg-warning/10";
    return "bg-error/10";
  };

  return (
    <div className="glass-morphic rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-muted-foreground">
            How are you feeling today?
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Profile Completion Badge */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getCompletionBgColor()}`}>
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${profileCompletion * 0.88} 88`}
                  className={getCompletionColor()}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-semibold ${getCompletionColor()}`}>
                  {profileCompletion}%
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-foreground">Profile</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;