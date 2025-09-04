import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterDrawer = ({ 
  isOpen = false, 
  onClose, 
  filters = {}, 
  onFiltersChange,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLocalFilters(filters);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, filters]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: { start: '', end: '' },
      severity: [],
      status: [],
      recordTypes: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'pending', label: 'Pending' }
  ];

  const recordTypeOptions = [
    { value: 'allergy', label: 'Allergies' },
    { value: 'medication', label: 'Medications' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'condition', label: 'Conditions' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-200 ${className}`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm animate-slide-in-right">
        <div className="h-full glass-morphic border-l border-white/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 safe-area-top">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150"
              aria-label="Close"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Date Range */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Date Range</h3>
              <div className="space-y-3">
                <Input
                  type="date"
                  label="From"
                  value={localFilters?.dateRange?.start || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...localFilters?.dateRange,
                    start: e?.target?.value
                  })}
                />
                <Input
                  type="date"
                  label="To"
                  value={localFilters?.dateRange?.end || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...localFilters?.dateRange,
                    end: e?.target?.value
                  })}
                />
              </div>
            </div>

            {/* Severity */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Severity</h3>
              <div className="space-y-2">
                {severityOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.severity?.includes(option?.value) || false}
                    onChange={(e) => {
                      const currentSeverity = localFilters?.severity || [];
                      const newSeverity = e?.target?.checked
                        ? [...currentSeverity, option?.value]
                        : currentSeverity?.filter(s => s !== option?.value);
                      handleFilterChange('severity', newSeverity);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Status</h3>
              <div className="space-y-2">
                {statusOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.status?.includes(option?.value) || false}
                    onChange={(e) => {
                      const currentStatus = localFilters?.status || [];
                      const newStatus = e?.target?.checked
                        ? [...currentStatus, option?.value]
                        : currentStatus?.filter(s => s !== option?.value);
                      handleFilterChange('status', newStatus);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Record Types */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Record Types</h3>
              <div className="space-y-2">
                {recordTypeOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.recordTypes?.includes(option?.value) || false}
                    onChange={(e) => {
                      const currentTypes = localFilters?.recordTypes || [];
                      const newTypes = e?.target?.checked
                        ? [...currentTypes, option?.value]
                        : currentTypes?.filter(t => t !== option?.value);
                      handleFilterChange('recordTypes', newTypes);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/10 safe-area-bottom">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;