import React from 'react';

const CustomSpinner = ({ size = 'small', color = '#1890ff' }) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className={`${sizeMap[size]} relative`}>
      <div 
        className="absolute inset-0 border-2 rounded-full animate-spin"
        style={{ 
          borderColor: color,
          borderRightColor: 'transparent',
          animationDuration: '0.75s',
          animationTimingFunction: 'linear'
        }}
      />
    </div>
  );
};

export default CustomSpinner; 