import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Validation function for theme values
  const isValidTheme = (theme) => ['light', 'dark'].includes(theme);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && isValidTheme(savedTheme)) {
          return savedTheme;
        }
      } catch (error) {
        console.warn('Error accessing localStorage:', error);
      }
      
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (error) {
        console.warn('Error detecting system theme preference:', error);
        return 'dark';
      }
    }
    return 'dark';
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first to avoid conflicts
    root.classList.remove('dark', 'light');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
    
    // Set loading to false after first render
    if (isLoading) {
      setIsLoading(false);
    }
  }, [theme, isLoading]);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't manually set a preference
      try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.warn('Error handling system theme change:', error);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Validation supplémentaire
      return isValidTheme(newTheme) ? newTheme : 'dark';
    });
  }, []);

  const setLightTheme = useCallback(() => setTheme('light'), []);
  const setDarkTheme = useCallback(() => setTheme('dark'), []);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoading
  }), [theme, toggleTheme, setLightTheme, setDarkTheme, isLoading]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};