import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import Icon from '../AppIcon';
import ActionSheetModal from './ActionSheetModal';
import AddRecordModal from './AddRecordModal';

const GlobalFloatingActionButton = ({ className = '' }) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const location = useLocation();

  const closeAllModals = () => {
    setIsActionSheetOpen(false);
    setActiveModal(null);
  };

  const openRecordModal = (recordType) => {
    setIsActionSheetOpen(false);
    setActiveModal(recordType);
  };

  const getContextualActions = () => {
    const currentPath = location?.pathname;
    
    const baseActions = [
      {
        icon: 'FileText',
        label: 'New Medical Record',
        description: 'Add medical document or record',
        action: () => openRecordModal('medical_record')
      },
      {
        icon: 'Upload',
        label: 'Upload Document',
        description: 'Upload medical files or reports',
        action: () => openRecordModal('document')
      },
      {
        icon: 'Pill',
        label: 'Add Medication',
        description: 'Log medication information',
        action: () => openRecordModal('medication')
      },
      {
        icon: 'Calendar',
        label: 'Schedule Appointment',
        description: 'Book new appointment',
        action: () => {
          console.log('Schedule Appointment clicked');
          setIsActionSheetOpen(false);
        }
      }
    ];

    switch (currentPath) {
      case '/dashboard-home':
        return [
          ...baseActions,
          {
            icon: 'Clock',
            label: 'Quick Log Entry',
            description: 'Add to today\'s timeline',
            action: () => {
              console.log('Quick Log Entry clicked');
              setIsActionSheetOpen(false);
            }
          }
        ];
      
      case '/records-hub':
        return baseActions;
      
      case '/timeline-view':
        return [
          {
            icon: 'Clock',
            label: 'Add Timeline Entry',
            description: 'Log health event or activity',
            action: () => {
              console.log('Add Timeline Entry clicked');
              setIsActionSheetOpen(false);
            }
          },
          ...baseActions
        ];
      
      case '/appointment-management':
        return [
          {
            icon: 'CalendarPlus',
            label: 'New Appointment',
            description: 'Schedule with doctor',
            action: () => {
              console.log('New Appointment clicked');
              setIsActionSheetOpen(false);
            }
          },
          {
            icon: 'Video',
            label: 'Virtual Consultation',
            description: 'Book online meeting',
            action: () => {
              console.log('Virtual Consultation clicked');
              setIsActionSheetOpen(false);
            }
          },
          ...baseActions?.slice(0, 3)
        ];
      
      default:
        return baseActions;
    }
  };

  const handleFABClick = () => {
    setIsActionSheetOpen(true);
  };

  return (
    <>
      <button
        onClick={handleFABClick}
        className={cn(`
          fixed bottom-20 right-4 z-150 w-14 h-14 
          gradient-primary rounded-full shadow-elevation-3
          flex items-center justify-center
          transition-all duration-150 ease-out
          hover:shadow-elevation-4 hover:scale-105
          active:scale-95 safe-area-bottom
          ${className}
        `)}
        aria-label="Quick actions"
      >
        <Icon 
          name="Plus" 
          size={24} 
          color="white" 
          strokeWidth={2.5}
        />
      </button>

      <ActionSheetModal
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        actions={getContextualActions()}
        title="Quick Actions"
      />

      <AddRecordModal
        isOpen={activeModal === 'medical_record'}
        onClose={closeAllModals}
        recordType="medical_record"
      />

      <AddRecordModal
        isOpen={activeModal === 'document'}
        onClose={closeAllModals}
        recordType="document"
      />

      <AddRecordModal
        isOpen={activeModal === 'medication'}
        onClose={closeAllModals}
        recordType="medication"
      />
    </>
  );
};

export default GlobalFloatingActionButton;