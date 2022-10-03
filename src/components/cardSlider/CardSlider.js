import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./CardSlider.css";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper";

const CardSlider = function({images, onClickImg}) {
  return (
    <div className="m-3">
      <Swiper
        grabCursor={true}
        slidesPerView={2}
        spaceBetween={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          600: {
            width: 600,
            slidesPerView: 4,
          },
          900: {
            width: 900,
            slidesPerView: 5,
          },
          1200: {
            width: 1200,
            slidesPerView: 6,
          }
        }}
      >
        {
          images.map((img) => {
            return (
              <SwiperSlide key={img._id}>
                <button
                  className="d-flex align-items-center wh" data-bs-toggle="modal" href="#exampleModalToggle" role="button"
                  onClick={()=> onClickImg(img)}
                >
                  <img src={img.url} alt="img" />
                </button>
              </SwiperSlide>
            )
          })    
        }   
        
      </Swiper>
    </div>
  );
} 

export default CardSlider;