import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button onClick={onClose} className="toast-close">×</button>
      </div>
    </div>
  );
};

export default Toast;