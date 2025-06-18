import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const Liked = () => {
  const navigate = useNavigate();
  const liked = JSON.parse(localStorage.getItem('likedProperties')) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Liked Properties</h2>
      {liked.length === 0 ? (
        <p className="text-center text-gray-600">No liked properties yet.</p>
      ) : (
        liked.map((property) => (
          <div key={property.id} className="mb-4 flex justify-center">
            <PropertyCard property={property} />
          </div>
        ))
      )}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/')}
          className="underline text-blue-600"
        >
          Back to Browse
        </button>
      </div>
    </div>
  );
};

export default Liked;
