import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordCard = ({ 
  record, 
  onEdit, 
  onDelete, 
  onShare, 
  onExport, 
  onClick,
  className = '' 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case 'allergy':
        return 'AlertTriangle';
      case 'medication':
        return 'Pill';
      case 'lab':
        return 'TestTube';
      case 'condition':
        return 'Heart';
      default:
        return 'FileText';
    }
  };

  const getRecordTypeColor = (type) => {
    switch (type) {
      case 'allergy':
        return 'text-error bg-error/10';
      case 'medication':
        return 'text-secondary bg-secondary/10';
      case 'lab':
        return 'text-warning bg-warning/10';
      case 'condition':
        return 'text-success bg-success/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      mild: 'bg-success/10 text-success',
      moderate: 'bg-warning/10 text-warning',
      severe: 'bg-error/10 text-error'
    };
    
    return colors?.[severity] || colors?.mild;
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-success/10 text-success',
      resolved: 'bg-muted/50 text-muted-foreground',
      pending: 'bg-warning/10 text-warning'
    };
    
    return colors?.[status] || colors?.active;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSwipeLeft = () => {
    setShowActions(true);
  };

  const handleActionClick = (action, e) => {
    e?.stopPropagation();
    setShowActions(false);
    
    switch (action) {
      case 'edit':
        onEdit?.(record);
        break;
      case 'delete':
        onDelete?.(record);
        break;
      case 'share':
        onShare?.(record);
        break;
      case 'export':
        onExport?.(record);
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          glass-morphic rounded-xl border border-white/20 p-4 cursor-pointer
          transition-all duration-150 ease-out
          hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]
          ${showActions ? 'translate-x-[-120px]' : 'translate-x-0'}
        `}
        onClick={() => onClick?.(record)}
        onTouchStart={(e) => {
          const startX = e?.touches?.[0]?.clientX;
          const handleTouchMove = (e) => {
            const currentX = e?.touches?.[0]?.clientX;
            const diff = startX - currentX;
            if (diff > 50) {
              handleSwipeLeft();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          document.addEventListener('touchmove', handleTouchMove);
          document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', handleTouchMove);
          }, { once: true });
        }}
      >
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getRecordTypeColor(record?.type)}`}>
            <Icon 
              name={getRecordTypeIcon(record?.type)} 
              size={20} 
              className="text-current"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground truncate pr-2">
                {record?.title}
              </h3>
              <span className="text-sm text-muted-foreground font-mono flex-shrink-0">
                {formatDate(record?.date)}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {record?.description}
            </p>
            
            <div className="flex items-center gap-2 flex-wrap">
              {record?.severity && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(record?.severity)}`}>
                  {record?.severity}
                </span>
              )}
              
              {record?.status && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record?.status)}`}>
                  {record?.status}
                </span>
              )}
              
              {record?.dosage && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground">
                  {record?.dosage}
                </span>
              )}
              
              {record?.frequency && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground">
                  {record?.frequency}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Swipe Actions */}
      <div className={`
        absolute right-0 top-0 h-full flex items-center gap-2 pr-4
        transition-opacity duration-150
        ${showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleActionClick('edit', e)}
          className="w-8 h-8 bg-accent/10 text-accent hover:bg-accent/20"
        >
          <Icon name="Edit" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleActionClick('share', e)}
          className="w-8 h-8 bg-primary/10 text-primary hover:bg-primary/20"
        >
          <Icon name="Share" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleActionClick('export', e)}
          className="w-8 h-8 bg-success/10 text-success hover:bg-success/20"
        >
          <Icon name="Download" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleActionClick('delete', e)}
          className="w-8 h-8 bg-error/10 text-error hover:bg-error/20"
        >
          <Icon name="Trash2" size={16} />
        </Button>
      </div>
      {/* Backdrop for closing actions */}
      {showActions && (
        <div 
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default RecordCard;