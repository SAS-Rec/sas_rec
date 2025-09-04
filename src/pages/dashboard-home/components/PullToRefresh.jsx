import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ children, onRefresh, threshold = 80 }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e) => {
    if (containerRef?.current && containerRef?.current?.scrollTop === 0) {
      setCanPull(true);
      startY.current = e?.touches?.[0]?.clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!canPull || isRefreshing) return;

    currentY.current = e?.touches?.[0]?.clientY;
    const distance = Math.max(0, currentY?.current - startY?.current);
    
    if (distance > 0) {
      e?.preventDefault();
      setPullDistance(Math.min(distance * 0.5, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (!canPull || isRefreshing) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    setCanPull(false);
  };

  const getRefreshIcon = () => {
    if (isRefreshing) return 'Loader2';
    if (pullDistance >= threshold) return 'Check';
    return 'ArrowDown';
  };

  const getRefreshText = () => {
    if (isRefreshing) return 'Refreshing...';
    if (pullDistance >= threshold) return 'Release to refresh';
    return 'Pull to refresh';
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-auto h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${pullDistance}px)`,
        transition: pullDistance === 0 || isRefreshing ? 'transform 0.3s ease-out' : 'none'
      }}
    >
      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
        style={{
          height: `${Math.max(pullDistance, 0)}px`,
          transform: `translateY(-${Math.max(pullDistance, 0)}px)`,
          opacity: pullDistance > 20 ? 1 : pullDistance / 20
        }}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon 
            name={getRefreshIcon()} 
            size={20} 
            className={isRefreshing ? 'animate-spin' : ''}
            style={{
              transform: pullDistance < threshold ? `rotate(${pullDistance * 2}deg)` : 'rotate(180deg)'
            }}
          />
          <span className="text-sm font-medium">{getRefreshText()}</span>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PullToRefresh;