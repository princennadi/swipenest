import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyCard = ({ property }) => {
  const images = property.images || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {images.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-48 sm:h-64"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Property ${property.id} - Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{property.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{property.location}</p>
        <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">${property.price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
