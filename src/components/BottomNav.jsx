import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 shadow-md z-50">
      <button
        onClick={() => navigate('/')}
        className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
      >
        <span>🏠</span>
        <span>Home</span>
      </button>
      <button
        onClick={() => navigate('/liked')}
        className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
      >
        <span>❤️</span>
        <span>Liked</span>
      </button>
      <button
        onClick={toggleDarkMode}
        className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
      >
        <span>{darkMode ? '🌞' : '🌙'}</span>
        <span>{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  );
};

export default BottomNav;
