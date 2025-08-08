import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105';
  const variants = {
    primary: 'bg-galaxy-purple text-white hover:bg-opacity-90',
    secondary: 'bg-galaxy-blue text-white hover:bg-opacity-90',
    outline: 'border-2 border-galaxy-purple text-white hover:bg-galaxy-purple/10',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 