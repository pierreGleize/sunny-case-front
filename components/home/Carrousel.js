import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carrousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings} style={{ marginBottom: "3rem" }}>
      <img src="/carrousel/bg-1.webp" alt="Image de fond" />
      <img src="/carrousel/bg-2.webp" alt="Image de fond" />
      <img src="/carrousel/bg-3.webp" alt="Image de fond" />
    </Slider>
  );
};

export default Carrousel;
