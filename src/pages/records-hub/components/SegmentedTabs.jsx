import React from 'react';

const SegmentedTabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex bg-muted/30 rounded-xl p-1 backdrop-blur-sm">
        {tabs?.map((tab) => (
          <button
            key={tab?.value}
            onClick={() => onTabChange(tab?.value)}
            className={`
              relative flex-1 px-3 py-2 text-sm font-medium rounded-lg
              transition-all duration-200 ease-out min-h-[44px] flex items-center justify-center
              ${activeTab === tab?.value
                ? 'text-primary bg-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
              }
            `}
          >
            <span className="relative z-10">{tab?.label}</span>
            {tab?.count !== undefined && (
              <span className={`
                ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium
                ${activeTab === tab?.value
                  ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }
              `}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedTabs;