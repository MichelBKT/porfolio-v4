import React from 'react';
import Toast from './Toast';

const ErrorToast = ({ message, onClose }) => {
  return (
    <Toast
      message={message}
      type="error"
      onClose={onClose}
      duration={5000}
    />
  );
};

export default ErrorToast; 