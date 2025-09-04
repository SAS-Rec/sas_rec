import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'all',
  searchQuery = '',
  onCreateRecord,
  onClearSearch,
  className = '' 
}) => {
  const getEmptyStateContent = () => {
    if (searchQuery) {
      return {
        icon: 'Search',
        title: 'No records found',
        description: `No records match "${searchQuery}". Try adjusting your search terms or filters.`,
        primaryAction: {
          label: 'Clear Search',
          onClick: onClearSearch
        },
        secondaryAction: {
          label: 'Add New Record',
          onClick: onCreateRecord
        }
      };
    }

    switch (type) {
      case 'allergy':
        return {
          icon: 'AlertTriangle',
          title: 'No allergies recorded',
          description: 'Keep track of your allergies and reactions to stay safe and informed during medical visits.',
          primaryAction: {
            label: 'Add Allergy',
            onClick: onCreateRecord
          }
        };
      
      case 'medication':
        return {
          icon: 'Pill',
          title: 'No medications recorded',
          description: 'Track your medications, dosages, and schedules to maintain proper adherence and avoid interactions.',
          primaryAction: {
            label: 'Add Medication',
            onClick: onCreateRecord
          }
        };
      
      case 'lab':
        return {
          icon: 'TestTube',
          title: 'No lab results recorded',
          description: 'Store your lab results and test reports to monitor your health progress over time.',
          primaryAction: {
            label: 'Add Lab Result',
            onClick: onCreateRecord
          }
        };
      
      case 'condition':
        return {
          icon: 'Heart',
          title: 'No conditions recorded',
          description: 'Document your medical conditions and their status to provide complete health information to your care team.',
          primaryAction: {
            label: 'Add Condition',
            onClick: onCreateRecord
          }
        };
      
      default:
        return {
          icon: 'FileText',
          title: 'No health records yet',
          description: 'Start building your digital health record by adding your medications, allergies, lab results, and medical conditions.',
          primaryAction: {
            label: 'Add First Record',
            onClick: onCreateRecord
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-6">
        <Icon 
          name={content?.icon} 
          size={32} 
          className="text-muted-foreground"
        />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {content?.title}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {content?.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={content?.primaryAction?.onClick}
          iconName="Plus"
          iconPosition="left"
        >
          {content?.primaryAction?.label}
        </Button>
        
        {content?.secondaryAction && (
          <Button
            variant="outline"
            onClick={content?.secondaryAction?.onClick}
          >
            {content?.secondaryAction?.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;