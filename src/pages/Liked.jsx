import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import BottomNav from '../components/BottomNav'; // from App.jsx

const Liked = () => {
  const [liked, setLiked] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('likedProperties');
    setLiked(stored ? JSON.parse(stored) : []);
  }, []);

  const removeLiked = (id) => {
    const updated = liked.filter((property) => property.id !== id);
    setLiked(updated);
    localStorage.setItem('likedProperties', JSON.stringify(updated));
    toast.error('Removed from favorites');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen pb-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <Toaster position="top-center" reverseOrder={false} />

        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
          Your Liked Properties
        </h2>

        {liked.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven’t liked any properties yet.
          </p>
        ) : (
          liked.map((property) => (
            <div key={property.id} className="mb-6 relative">
              <Link to={`/property/${property.id}`}>
                <PropertyCard property={property} />
              </Link>
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
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-700 hover:bg-blue-300 text-white px-4 py-2 rounded-xl shadow"
        >
          ⬅ Back to Browse
        </button>
      </div>

      <BottomNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Liked;
