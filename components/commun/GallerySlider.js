import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const GallerySlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 790) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={0}
        loop={true}
        speed={500}
        slidesPerView={isMobile ? 4 : 6}
        effect="Coverflow"
        longSwipes={true}
        longSwipesMs={1000}
        longSwipesRatio={0.1}
        centeredSlides={true}
        centeredSlidesBounds={true}
        grabCursor={true}
      >
        {[...Array(11)].map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/slider/photo${index + 1}.avif`}
              alt={`Photo ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;
