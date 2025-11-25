import React from 'react';

const Card = ({ 
  children, 
  padding = 'md',
  hover = false,
  className = '' 
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClass = hover ? 'hover:shadow-md transition' : '';
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${paddings[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;