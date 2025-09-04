import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterClick,
  hasActiveFilters = false,
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 relative">
        <div className={`
          relative transition-all duration-200
          ${isFocused ? 'scale-[1.02]' : 'scale-100'}
        `}>
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
          />
          <Input
            type="search"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-4 h-12 bg-white/80 backdrop-blur-sm border-white/20 focus:border-primary/30 focus:ring-primary/20"
          />
        </div>
      </div>
      <Button
        variant={hasActiveFilters ? "default" : "outline"}
        size="icon"
        onClick={onFilterClick}
        className={`
          w-12 h-12 flex-shrink-0 relative
          ${hasActiveFilters ? 'bg-primary text-white' : 'bg-white/80 backdrop-blur-sm border-white/20'}
        `}
      >
        <Icon name="Filter" size={20} />
        {hasActiveFilters && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-white" />
        )}
      </Button>
    </div>
  );
};

export default SearchBar;