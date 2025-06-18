import React from 'react';

function PropertyCard({ property }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-80 text-center">
      <img
        src={property.img || "https://via.placeholder.com/400x300?text=No+Image"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-700 font-semibold">{property.price}</p>
    </div>
  );
}

export default PropertyCard;
