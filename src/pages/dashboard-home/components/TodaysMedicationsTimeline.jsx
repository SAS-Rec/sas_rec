import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodaysMedicationsTimeline = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "08:00 AM",
      taken: true,
      type: "tablet",
      color: "bg-success"
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: false,
      type: "tablet",
      color: "bg-primary"
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "08:00 PM",
      taken: false,
      type: "tablet",
      color: "bg-secondary"
    },
    {
      id: 4,
      name: "Vitamin D3",
      dosage: "1000 IU",
      time: "08:00 PM",
      taken: false,
      type: "capsule",
      color: "bg-warning"
    }
  ]);

  const handleToggleMedication = (id) => {
    setMedications(prev => 
      prev?.map(med => 
        med?.id === id ? { ...med, taken: !med?.taken } : med
      )
    );
  };

  const adherencePercentage = Math.round((medications?.filter(med => med?.taken)?.length / medications?.length) * 100);

  const getMedicationIcon = (type) => {
    switch (type) {
      case 'tablet':
        return 'Pill';
      case 'capsule':
        return 'Capsule';
      case 'liquid':
        return 'Droplets';
      default:
        return 'Pill';
    }
  };

  return (
    <div className="glass-morphic rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Today's Medications</h2>
          <p className="text-sm text-muted-foreground">
            {medications?.filter(med => med?.taken)?.length} of {medications?.length} taken
          </p>
        </div>
        
        {/* Adherence Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            adherencePercentage >= 80 
              ? 'bg-success/10 text-success' 
              : adherencePercentage >= 60 
                ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
          }`}>
            {adherencePercentage}% adherence
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {medications?.map((medication, index) => (
          <div key={medication?.id} className="flex items-center gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                medication?.taken ? 'bg-success' : medication?.color
              } flex-shrink-0`} />
              {index < medications?.length - 1 && (
                <div className="w-0.5 h-8 bg-border mt-2" />
              )}
            </div>
            
            {/* Medication Card */}
            <div className={`flex-1 p-4 rounded-xl border transition-all duration-150 ${
              medication?.taken 
                ? 'bg-success/5 border-success/20' :'bg-card border-border hover:border-primary/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${medication?.color}/10 flex items-center justify-center`}>
                    <Icon 
                      name={getMedicationIcon(medication?.type)} 
                      size={20} 
                      className={medication?.color?.replace('bg-', 'text-')}
                    />
                  </div>
                  
                  <div>
                    <h3 className={`font-medium ${
                      medication?.taken ? 'text-muted-foreground line-through' : 'text-foreground'
                    }`}>
                      {medication?.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{medication?.dosage}</span>
                      <span>•</span>
                      <span className="font-mono">{medication?.time}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant={medication?.taken ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleMedication(medication?.id)}
                  iconName={medication?.taken ? "RotateCcw" : "Check"}
                  iconSize={16}
                >
                  {medication?.taken ? "Undo" : "Take"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" className="flex-1">
          Add Medication
        </Button>
        <Button variant="ghost" size="sm" iconName="Clock" iconPosition="left" className="flex-1">
          Set Reminder
        </Button>
      </div>
    </div>
  );
};

export default TodaysMedicationsTimeline;