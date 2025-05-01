import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Update theme colors
    const root = document.documentElement;
    root.style.setProperty('--background', isDarkMode ? '#1a1a1a' : '#f8fafc');
    root.style.setProperty('--text', isDarkMode ? '#ffffff' : '#1a1a1a');
    root.style.setProperty('--primary', isDarkMode ? '#6e8efb' : '#2c3e50');
    root.style.setProperty('--secondary', isDarkMode ? '#a0a0a0' : '#64748b');
    root.style.setProperty('--accent1', isDarkMode ? '#6e8efb' : '#6e8efb');
    root.style.setProperty('--accent2', isDarkMode ? '#a777e3' : '#a777e3');
    root.style.setProperty('--cardBackground', isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)');
    root.style.setProperty('--border', isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 