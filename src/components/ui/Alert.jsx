import React from 'react';

const Alert = ({ severity = 'info', className = '' }) => {
  const getBackgroundColor = () => {
    switch (severity) {
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'success':
        return '#4caf50';
      default:
        return '#2196f3';
    }
  };

  const getMessage = () => {
    switch (severity) {
      case 'error':
        return 'An error occurred';
      case 'warning':
        return 'Warning';
      case 'success':
        return 'Success';
      default:
        return 'Information';
    }
  };

  return (
    <div
      className={`alert alert-${severity} ${className}`}
      style={{
        padding: '12px 16px',
        borderRadius: '4px',
        backgroundColor: getBackgroundColor(),
        color: '#fff',
      }}
    >
      {getMessage()}
    </div>
  );
};

export default Alert;
