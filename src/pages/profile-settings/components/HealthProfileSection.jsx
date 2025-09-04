import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthProfileSection = ({ healthProfile, onUpdateHealth }) => {
  const completionItems = [
    { key: 'allergies', label: 'Allergies', completed: healthProfile?.allergies?.length > 0 },
    { key: 'medications', label: 'Current Medications', completed: healthProfile?.medications?.length > 0 },
    { key: 'conditions', label: 'Medical Conditions', completed: healthProfile?.conditions?.length > 0 },
    { key: 'emergencyContacts', label: 'Emergency Contacts', completed: healthProfile?.emergencyContacts?.length > 0 },
    { key: 'insurance', label: 'Insurance Information', completed: !!healthProfile?.insurance },
    { key: 'primaryDoctor', label: 'Primary Doctor', completed: !!healthProfile?.primaryDoctor }
  ];

  const completedCount = completionItems?.filter(item => item?.completed)?.length;
  const completionPercentage = Math.round((completedCount / completionItems?.length) * 100);

  const getCompletionColor = () => {
    if (completionPercentage >= 80) return 'text-success';
    if (completionPercentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBarColor = () => {
    if (completionPercentage >= 80) return 'bg-success';
    if (completionPercentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
          <Icon name="Heart" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Health Profile</h2>
          <p className="text-sm text-muted-foreground">Complete your health information</p>
        </div>
      </div>
      {/* Completion Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {completionItems?.length} sections completed
            </p>
          </div>
          <div className={`text-2xl font-bold ${getCompletionColor()}`}>
            {completionPercentage}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full ${getProgressBarColor()} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Completion Items */}
        <div className="space-y-3">
          {completionItems?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item?.completed ? 'bg-success text-white' : 'bg-muted border-2 border-muted-foreground/30'
                }`}>
                  {item?.completed && <Icon name="Check" size={14} />}
                </div>
                <span className={`font-medium ${item?.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item?.label}
                </span>
              </div>
              {!item?.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateHealth(item?.key)}
                  iconName="Plus"
                  iconSize={14}
                >
                  Add
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => onUpdateHealth('allergies')}
            iconName="AlertTriangle"
            iconPosition="left"
            className="justify-start"
          >
            Manage Allergies
          </Button>
          <Button
            variant="outline"
            onClick={() => onUpdateHealth('medications')}
            iconName="Pill"
            iconPosition="left"
            className="justify-start"
          >
            Add Medications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthProfileSection;