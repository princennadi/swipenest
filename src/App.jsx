import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { Toaster, toast } from 'react-hot-toast';
import { properties } from './data/properties';
import PropertyCard from './components/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BottomNav from './components/BottomNav'; // from App.jsx


function App() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(() => {
    const stored = localStorage.getItem('likedProperties');
    return stored ? JSON.parse(stored) : [];
  });
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('likedProperties', JSON.stringify(liked));
  }, [liked]);

  const handleSwipe = (direction, property) => {
    if (direction === 'right') {
      setLiked((prev) => [...prev, property]);
      toast.success('You liked a property!');
    }
    setHistory((prev) => [...prev, index]);
    setIndex((prev) => prev + 1);
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setIndex(prevIndex);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">
        <Toaster position="top-center" reverseOrder={false} />

        <header className="w-full max-w-xl flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">🏡 SwipeNest</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">Find your next home</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-xl"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {index < properties.length ? (
          <div className="relative w-80 h-[400px]">
          <TinderCard
            key={properties[index].id}
            onSwipe={(dir) => handleSwipe(dir, properties[index])}
            preventSwipe={['up', 'down']}
            className="absolute"
          >
             <div className="w-80 transition-transform duration-300 ease-in-out">
              <PropertyCard property={properties[index]} />
             <div className="mt-2 flex justify-center">
            <Link
              to={`/property/${properties[index].id}`}
              className="text-blue-600 dark:text-blue-300 underline hover:text-blue-800 text-sm"
            >
              More Info →
            </Link>
          </div>
        </div>
          </TinderCard>

          </div>
        ) : (
          <h2 className="text-2xl font-bold mb-4">No more properties!</h2>
        )}

        <div className="mt-4 flex flex-col items-center space-y-2">
          <button
            onClick={handleGoBack}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-xl shadow"
          >
            ⬅ Back
          </button>
          <button
            onClick={() => navigate('/liked')}
            className="bg-blue-700 hover:bg-blue-300 text-white px-4 py-2 rounded-xl shadow"
          >
            View Liked Properties ({liked.length})
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 shadow-md">
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
    </div>
  );
}

export default App;
