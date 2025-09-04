import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import RecordDetailSheet from '../../../components/ui/RecordDetailSheet';

const RecentRecordsList = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  const recentRecords = [
    {
      id: 1,
      type: 'lab',
      title: 'Complete Blood Count (CBC)',
      date: '2025-01-03',
      facility: 'LabCorp',
      status: 'Normal',
      priority: 'normal',
      description: 'Routine blood work showing all values within normal range. Hemoglobin: 14.2 g/dL, White Blood Cells: 6,800/μL, Platelets: 285,000/μL.',
      results: {
        hemoglobin: '14.2 g/dL',
        wbc: '6,800/μL',
        platelets: '285,000/μL'
      }
    },
    {
      id: 2,
      type: 'medication',
      title: 'Lisinopril Prescription',
      date: '2025-01-02',
      facility: 'Heart Care Medical Center',
      status: 'Active',
      priority: 'high',
      description: 'ACE inhibitor prescribed for blood pressure management. Take once daily in the morning.',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Emily Rodriguez'
    },
    {
      id: 3,
      type: 'condition',
      title: 'Hypertension Management',
      date: '2025-01-01',
      facility: 'Heart Care Medical Center',
      status: 'Ongoing',
      priority: 'high',
      description: 'Stage 1 hypertension being managed with medication and lifestyle modifications. Regular monitoring required.',
      icd10: 'I10',
      severity: 'Moderate'
    },
    {
      id: 4,
      type: 'allergy',
      title: 'Penicillin Allergy',
      date: '2024-12-28',
      facility: 'Family Health Associates',
      status: 'Active',
      priority: 'critical',
      description: 'Severe allergic reaction to penicillin antibiotics. Causes hives and difficulty breathing.',
      severity: 'Severe',
      reactions: ['Hives', 'Difficulty breathing', 'Swelling']
    },
    {
      id: 5,
      type: 'vital',
      title: 'Blood Pressure Reading',
      date: '2024-12-27',
      facility: 'Home Monitoring',
      status: 'Elevated',
      priority: 'medium',
      description: 'Home blood pressure monitoring showing slightly elevated readings.',
      systolic: '142',
      diastolic: '88',
      heartRate: '72'
    }
  ];

  const getRecordIcon = (type) => {
    switch (type) {
      case 'lab':
        return 'TestTube';
      case 'medication':
        return 'Pill';
      case 'condition':
        return 'Stethoscope';
      case 'allergy':
        return 'AlertTriangle';
      case 'vital':
        return 'Activity';
      default:
        return 'FileText';
    }
  };

  const getRecordColor = (type) => {
    switch (type) {
      case 'lab':
        return 'text-warning';
      case 'medication':
        return 'text-secondary';
      case 'condition':
        return 'text-primary';
      case 'allergy':
        return 'text-error';
      case 'vital':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRecordBgColor = (type) => {
    switch (type) {
      case 'lab':
        return 'bg-warning/10';
      case 'medication':
        return 'bg-secondary/10';
      case 'condition':
        return 'bg-primary/10';
      case 'allergy':
        return 'bg-error/10';
      case 'vital':
        return 'bg-success/10';
      default:
        return 'bg-muted/10';
    }
  };

  const getStatusColor = (status, priority) => {
    if (priority === 'critical') return 'bg-error/10 text-error';
    if (priority === 'high') return 'bg-warning/10 text-warning';
    
    switch (status?.toLowerCase()) {
      case 'normal':
        return 'bg-success/10 text-success';
      case 'active':
        return 'bg-accent/10 text-accent';
      case 'ongoing':
        return 'bg-primary/10 text-primary';
      case 'elevated':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== today?.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsDetailSheetOpen(true);
  };

  const handleCloseDetailSheet = () => {
    setIsDetailSheetOpen(false);
    setSelectedRecord(null);
  };

  return (
    <>
      <div className="glass-morphic rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Records</h2>
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentRecords?.map((record) => (
            <div
              key={record?.id}
              onClick={() => handleRecordClick(record)}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-150 cursor-pointer active:scale-98"
            >
              <div className="flex items-start gap-4">
                {/* Record Icon */}
                <div className={`w-12 h-12 rounded-full ${getRecordBgColor(record?.type)} flex items-center justify-center flex-shrink-0`}>
                  <Icon 
                    name={getRecordIcon(record?.type)} 
                    size={20} 
                    className={getRecordColor(record?.type)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{record?.title}</h3>
                      <p className="text-sm text-muted-foreground">{record?.facility}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      <span className="text-xs text-muted-foreground">{formatDate(record?.date)}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status, record?.priority)}`}>
                        {record?.status}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {record?.description}
                  </p>
                  
                  {/* Type-specific preview */}
                  {record?.type === 'medication' && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-mono">{record?.dosage}</span>
                      <span>•</span>
                      <span>{record?.frequency}</span>
                    </div>
                  )}
                  
                  {record?.type === 'vital' && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-mono">{record?.systolic}/{record?.diastolic} mmHg</span>
                      <span>•</span>
                      <span>{record?.heartRate} bpm</span>
                    </div>
                  )}
                </div>
                
                <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
            View All Records
          </Button>
        </div>
      </div>
      {/* Record Detail Sheet */}
      <RecordDetailSheet
        isOpen={isDetailSheetOpen}
        onClose={handleCloseDetailSheet}
        recordData={selectedRecord}
        recordType={selectedRecord?.type || 'general'}
      />
    </>
  );
};

export default RecentRecordsList;