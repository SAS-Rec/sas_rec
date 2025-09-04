import React, { useEffect } from 'react';
import Icon from '../AppIcon';

const ActionSheetModal = ({ 
  isOpen = false, 
  onClose, 
  actions = [], 
  title = "Actions",
  className = '' 
}) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-200 ${className}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="action-sheet-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      {/* Action Sheet */}
      <div className="absolute bottom-0 left-0 right-0 animate-slide-up">
        <div className="glass-morphic rounded-t-2xl border-t border-white/20 safe-area-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 
              id="action-sheet-title"
              className="text-lg font-semibold text-foreground"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150"
              aria-label="Close"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          {/* Actions */}
          <div className="p-2">
            {actions?.map((action, index) => (
              <button
                key={index}
                onClick={action?.action}
                className="
                  w-full flex items-center gap-3 p-3 rounded-lg
                  hover:bg-muted/50 active:bg-muted/70 active:scale-98
                  transition-all duration-150 ease-out
                  text-left
                "
                style={{
                  animationDelay: `${index * 75}ms`
                }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={action?.icon} 
                    size={20} 
                    color="var(--color-primary)"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">
                    {action?.label}
                  </div>
                  {action?.description && (
                    <div className="text-sm text-muted-foreground">
                      {action?.description}
                    </div>
                  )}
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>
            ))}
          </div>
          
          {/* Cancel Button */}
          <div className="p-4 pt-2">
            <button
              onClick={onClose}
              className="
                w-full py-3 px-4 rounded-lg
                bg-muted/50 hover:bg-muted/70
                text-foreground font-medium
                transition-all duration-150 ease-out
                active:scale-98
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionSheetModal;