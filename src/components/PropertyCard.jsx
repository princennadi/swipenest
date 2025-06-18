import React from 'react';

const PropertyCard = ({ property }) => {
  return (
<div className="bg-white rounded-2xl shadow-lg w-80 p-5 transition-all duration-300 ease-in-out hover:scale-[1.01]">
<img src={property.image} alt={property.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
      <h2 className="text-xl font-semibold">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-600 font-bold">{property.price}</p>
      <p className="text-sm text-gray-500">{property.sqft}</p>
    </div>
  );
};

export default PropertyCard;
