import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
