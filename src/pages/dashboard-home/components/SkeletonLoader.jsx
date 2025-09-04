import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderWelcomeSkeleton = () => (
    <div className="glass-morphic rounded-2xl p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-8 bg-muted rounded-lg w-48 mb-2" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-muted rounded-full" />
          <div className="w-12 h-12 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );

  const renderMedicationSkeleton = () => (
    <div className="glass-morphic rounded-2xl p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-6 bg-muted rounded w-40 mb-1" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        <div className="h-6 bg-muted rounded-full w-20" />
      </div>
      
      <div className="space-y-3">
        {[...Array(3)]?.map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-muted rounded-full" />
              {index < 2 && <div className="w-0.5 h-8 bg-muted mt-2" />}
            </div>
            <div className="flex-1 p-4 rounded-xl bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div>
                    <div className="h-5 bg-muted rounded w-24 mb-1" />
                    <div className="h-4 bg-muted rounded w-32" />
                  </div>
                </div>
                <div className="h-8 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointmentSkeleton = () => (
    <div className="glass-morphic rounded-2xl p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-muted rounded w-44" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-muted rounded-full" />
            <div className="w-8 h-8 bg-muted rounded-full" />
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="h-5 bg-muted rounded w-32 mb-1" />
                <div className="h-4 bg-muted rounded w-24" />
              </div>
              <div className="h-6 bg-muted rounded-full w-20" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-40" />
              <div className="h-4 bg-muted rounded w-44" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecordSkeleton = () => (
    <div className="glass-morphic rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-muted rounded w-32" />
        <div className="h-8 bg-muted rounded w-20" />
      </div>

      <div className="space-y-3">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="bg-muted/30 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="h-5 bg-muted rounded w-40 mb-1" />
                    <div className="h-4 bg-muted rounded w-32" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-5 bg-muted rounded-full w-12" />
                  </div>
                </div>
                <div className="h-4 bg-muted rounded w-full mb-1" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="bg-card border border-border rounded-xl p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-muted rounded-full" />
        <div className="flex-1">
          <div className="h-5 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-1/2 mb-2" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  );

  const renderSkeletons = () => {
    switch (type) {
      case 'welcome':
        return renderWelcomeSkeleton();
      case 'medication':
        return renderMedicationSkeleton();
      case 'appointment':
        return renderAppointmentSkeleton();
      case 'records':
        return renderRecordSkeleton();
      case 'card':
      default:
        return [...Array(count)]?.map((_, index) => (
          <div key={index} className={index > 0 ? 'mt-3' : ''}>
            {renderCardSkeleton()}
          </div>
        ));
    }
  };

  return <>{renderSkeletons()}</>;
};

export default SkeletonLoader;