import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null,
      tooltip: 'Dashboard Home'
    },
    {
      label: 'Records',
      path: '/records-hub',
      icon: 'FileText',
      badge: null,
      tooltip: 'Health Records'
    },
    {
      label: 'Timeline',
      path: '/timeline-view',
      icon: 'Clock',
      badge: 3,
      tooltip: 'Timeline View'
    },
    {
      label: 'Appointments',
      path: '/appointment-management',
      icon: 'Calendar',
      badge: 1,
      tooltip: 'Appointments'
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'User',
      badge: null,
      tooltip: 'Profile Settings'
    }
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-100 glass-morphic border-t border-white/20 safe-area-bottom ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-4 py-2 h-16">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleTabChange(item?.path)}
              className={`
                relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1
                rounded-lg transition-all duration-150 ease-out
                ${active 
                  ? 'text-primary bg-primary/10 scale-105' :'text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95'
                }
              `}
              aria-label={item?.tooltip}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative">
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2}
                  className="transition-all duration-150"
                />
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </div>
              <span className={`
                text-xs font-medium mt-1 transition-all duration-150
                ${window.innerWidth < 375 ? 'hidden' : 'block'}
                ${active ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {item?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;