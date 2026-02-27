import React from 'react';

const Skeleton = ({ variant = 'rectangular', height, width, className = '' }) => {
  const style = {
    height: height || '20px',
    width: width || '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: variant === 'circular' ? '50%' : '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  return <div className={`skeleton ${className}`} style={style} />;
};

export default Skeleton;
