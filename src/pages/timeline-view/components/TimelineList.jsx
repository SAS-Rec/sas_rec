import React from 'react';
import TimelineEntry from './TimelineEntry';
import Icon from '../../../components/AppIcon';

const TimelineList = ({ 
  entries, 
  onStatusChange, 
  onSnooze, 
  isLoading = false,
  className = '' 
}) => {
  
  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="flex gap-4 pb-6">
            <div className="w-12 h-12 rounded-full bg-muted animate-pulse flex-shrink-0" />
            <div className="flex-1 glass-morphic rounded-xl p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!entries || entries?.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Icon name="Calendar" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Timeline Entries</h3>
        <p className="text-muted-foreground max-w-sm">
          No medications or appointments scheduled for this date. 
          Try selecting a different date or add new entries.
        </p>
      </div>
    );
  }

  // Group entries by time for better organization
  const groupedEntries = entries?.reduce((groups, entry) => {
    const timeKey = entry?.time?.substring(0, 5); // HH:MM format
    if (!groups?.[timeKey]) {
      groups[timeKey] = [];
    }
    groups?.[timeKey]?.push(entry);
    return groups;
  }, {});

  const sortedTimeKeys = Object.keys(groupedEntries)?.sort();

  return (
    <div className={`space-y-2 ${className}`}>
      {sortedTimeKeys?.map((timeKey, timeIndex) => (
        <div key={timeKey}>
          {groupedEntries?.[timeKey]?.map((entry, entryIndex) => (
            <TimelineEntry
              key={entry?.id}
              entry={entry}
              onStatusChange={onStatusChange}
              onSnooze={onSnooze}
              className={entryIndex === groupedEntries?.[timeKey]?.length - 1 && timeIndex === sortedTimeKeys?.length - 1 ? '' : 'mb-2'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimelineList;