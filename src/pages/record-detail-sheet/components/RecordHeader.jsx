import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordHeader = ({ 
  recordType, 
  createdDate, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete, 
  onShare, 
  onExport, 
  onClose 
}) => {
  const getRecordTypeIcon = () => {
    switch (recordType) {
      case 'medication':
        return 'Pill';
      case 'allergy':
        return 'AlertTriangle';
      case 'lab':
        return 'TestTube';
      case 'condition':
        return 'Activity';
      default:
        return 'FileText';
    }
  };

  const getRecordTypeColor = () => {
    switch (recordType) {
      case 'medication':
        return 'text-secondary';
      case 'allergy':
        return 'text-error';
      case 'lab':
        return 'text-warning';
      case 'condition':
        return 'text-success';
      default:
        return 'text-primary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 safe-area-top bg-white/95 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-current/10 flex items-center justify-center ${getRecordTypeColor()}`}>
          <Icon 
            name={getRecordTypeIcon()} 
            size={24} 
            className="text-current"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground capitalize">
            {recordType} Record
          </h1>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(createdDate)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              iconName="Edit"
              iconSize={16}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              iconName="Share"
              iconSize={16}
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconSize={16}
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              iconName="Trash2"
              iconSize={16}
              className="text-error hover:text-error"
            >
              Delete
            </Button>
          </>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150 ml-2"
          aria-label="Close"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecordHeader;