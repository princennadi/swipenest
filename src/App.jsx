import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { Toaster, toast } from 'react-hot-toast';
import { properties } from './data/properties';
import PropertyCard from './components/PropertyCard';

function App() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(() => {
    const stored = localStorage.getItem('likedProperties');
    return stored ? JSON.parse(stored) : [];
  });
  const [history, setHistory] = useState([]);
  const [viewingLikes, setViewingLikes] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const removeLiked = (id) => {
    setLiked((prevLiked) => {
      const updated = prevLiked.filter((property) => property.id !== id);
      localStorage.setItem('likedProperties', JSON.stringify(updated));
      return updated;
    });
    setTimeout(() => {
      toast.error('Removed from favorites');
    }, 500);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">

        {/* Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Header */}
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

        {!viewingLikes ? (
          <>
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
                onClick={() => setViewingLikes(true)}
                className="bg-blue-700 hover:bg-blue-300 text-white px-4 py-2 rounded-xl shadow"
                // underneath is to make the code look like a hyperlink.
                //className="underline text-blue-700 dark:text-blue-300 hover:text-blue-500"
              >
                View Liked Properties ({liked.length})
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Your Liked Properties</h2>
            {liked.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">You haven’t liked any properties yet.</p>
            ) : (
              liked.map((property) => (
                <div key={property.id} className="mb-6 relative">
                  <PropertyCard property={property} />
                  <button
                    onClick={() => removeLiked(property.id)}
                    className="mt-2 bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded shadow-sm"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))
            )}
            <button
              onClick={() => setViewingLikes(false)}
              className="bg-blue-700 hover:bg-blue-300 text-white px-4 py-2 rounded-xl shadow"
              >
              ⬅ Back to Browse
            </button>
          </div>
        )}
      </div>
      {/* Bottom Tab Menu */}
<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 shadow-md">
  <button
    onClick={() => setViewingLikes(false)}
    className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
  >
    <span>🏠</span>
    <span>Home</span>
  </button>
  <button
    onClick={() => setViewingLikes(true)}
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
    // change the icons on the bottom row to something actually usable. 
  );
}

export default App;
