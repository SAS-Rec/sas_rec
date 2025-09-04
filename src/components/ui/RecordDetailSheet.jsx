import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RecordDetailSheet = ({ 
  isOpen = false, 
  onClose, 
  recordData = null,
  recordType = 'general',
  className = '' 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (recordData) {
        setFormData(recordData);
      }
    } else {
      document.body.style.overflow = 'unset';
      setIsEditing(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, recordData]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      onClose();
    }
  };

  const handleSave = () => {
    console.log('Saving record:', formData);
    setIsEditing(false);
    // Here you would typically save to your state management or API
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRecordTypeIcon = () => {
    switch (recordType) {
      case 'medication':
        return 'Pill';
      case 'appointment':
        return 'Calendar';
      case 'lab':
        return 'TestTube';
      case 'vital':
        return 'Activity';
      default:
        return 'FileText';
    }
  };

  const getRecordTypeColor = () => {
    switch (recordType) {
      case 'medication':
        return 'text-secondary';
      case 'appointment':
        return 'text-accent';
      case 'lab':
        return 'text-warning';
      case 'vital':
        return 'text-success';
      default:
        return 'text-primary';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-250 ${className}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-detail-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      {/* Sheet */}
      <div className="absolute inset-0 md:inset-4 md:max-w-2xl md:mx-auto animate-slide-up">
        <div className="h-full glass-morphic md:rounded-2xl border border-white/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 safe-area-top">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-current/10 flex items-center justify-center ${getRecordTypeColor()}`}>
                <Icon 
                  name={getRecordTypeIcon()} 
                  size={20} 
                  className="text-current"
                />
              </div>
              <div>
                <h2 
                  id="record-detail-title"
                  className="text-lg font-semibold text-foreground"
                >
                  {isEditing ? 'Edit Record' : 'Record Details'}
                </h2>
                <p className="text-sm text-muted-foreground capitalize">
                  {recordType} Record
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  iconName="Edit"
                  iconSize={16}
                >
                  Edit
                </Button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150"
                aria-label="Close"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {recordData ? (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Basic Information</h3>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Title
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData?.title || ''}
                          onChange={(e) => handleInputChange('title', e?.target?.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                      ) : (
                        <p className="text-foreground">{recordData?.title || 'No title'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Date
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={formData?.date || ''}
                          onChange={(e) => handleInputChange('date', e?.target?.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                      ) : (
                        <p className="text-foreground font-mono">{recordData?.date || 'No date'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData?.description || ''}
                          onChange={(e) => handleInputChange('description', e?.target?.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="text-foreground">{recordData?.description || 'No description'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Type-specific fields */}
                {recordType === 'medication' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Medication Details</h3>
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Dosage
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData?.dosage || ''}
                            onChange={(e) => handleInputChange('dosage', e?.target?.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                          />
                        ) : (
                          <p className="text-foreground font-mono">{recordData?.dosage || 'No dosage'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Frequency
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData?.frequency || ''}
                            onChange={(e) => handleInputChange('frequency', e?.target?.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                          />
                        ) : (
                          <p className="text-foreground">{recordData?.frequency || 'No frequency'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="FileX" size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Record Data</h3>
                <p className="text-muted-foreground">No record information available to display.</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {isEditing && (
            <div className="p-4 border-t border-white/10 safe-area-bottom">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="flex-1"
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordDetailSheet;