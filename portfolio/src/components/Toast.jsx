import React from 'react';
import { useEffect } from 'react';


const Toast = ({ message}) => {
  
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in duration-1000">
      {message}
    </div>
  );
};

export default Toast; 