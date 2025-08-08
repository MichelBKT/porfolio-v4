import React from 'react';

const Typography = ({ 
  variant = 'body1', 
  children, 
  className = '', 
  color = '',
  font = 'Space Grotesk, sans serif',
  ...props 
}) => {
  const variants = {
    h1: 'lg:text-5xl md:text-xl text:lg font-bold',
    h2: 'lg:text-3xl text-2xl font-bold',
    h3: 'lg:text-3xl text-xl font-bold',
    h4: 'lg:text-2xl text-lg font-bold',
    h5: 'lg:text-xl text-md font-bold',
    h6: 'lg:text-lg text-sm font-bold',
    subtitle1: 'text-lg font-medium',
    subtitle2: 'text-base font-medium',
    body1: 'text-base',
    body2: 'text-sm',
    button: 'text-sm font-medium uppercase tracking-wider',
    caption: 'text-xs',
    overline: 'text-xs uppercase tracking-widest',
  };

  const colors = {
    primary: 'text-galaxy-purple',
    secondary: 'text-galaxy-blue',
    white: 'text-white',
    gray: 'text-gray-300',
    error: 'text-red-500',
    success: 'text-green-500',
  };

  const fonts = {
    familyBody: 'Space Grotesk, sans serif',
    familyTitle: 'Zen Dots, sans serif'
  }

  const Tag = variant.startsWith('h') ? variant : 'p';

  return (
    <Tag
      className={`${variants[variant]} ${colors[color]} ${className}`}
      style={{ fontFamily: variant.startsWith('h') ? fonts.familyTitle : fonts.familyBody }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography; 