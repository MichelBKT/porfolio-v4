import React, { useEffect } from 'react';

const Toast = ({ typeAlert, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${typeAlert === "success" ? "bg-green-500" : "bg-red-500"} transition-all duration-300 animate-fade-in`}>
      <div className="flex items-center">
        <span className="mr-4">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;