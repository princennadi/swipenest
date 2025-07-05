import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { Toaster } from 'react-hot-toast';
import BottomNav from '../components/BottomNav'; // from App.jsx

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const property = properties.find((prop) => prop.id.toString() === id);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!property) {
    return (
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            ⬅ Back to Browse
          </button>
        </div>
        <BottomNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen pb-20 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Property Details
          </h1>
          <PropertyCard property={property} />
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            ⬅ Back
          </button>
        </div>
      </div>

      <BottomNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default PropertyPage;
