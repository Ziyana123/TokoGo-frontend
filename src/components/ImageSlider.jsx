import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import image1 from '../assets/toko-1.webp';
import image2 from '../assets/toko-2.webp';
import image3 from '../assets/toko-3.webp';
import image4 from '../assets/toko-4.webp';

const ImageSlider = () => {
  const images = [image1, image2, image3, image4];

  return (
    <div className="my-8 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Toko Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
