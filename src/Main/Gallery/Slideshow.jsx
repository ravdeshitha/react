import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Slideshow({category}) {
  const [slides, setSlides] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/mainHome/gallery/posters`)
      .then((res) => {
        const posters = res.data.result;
        setSlides(posters.filter(item => item.category === category));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change the interval duration (in milliseconds) as per your requirement

    return () => clearInterval(interval);
  }, [currentIndex]); // Clear the interval when currentIndex changes

  return (
    <div className="max-w-[1450px] h-[400px] w-full m-auto py-5 px-4 relative mt-2 group  mb-4">
      <div className="w-full h-full rounded-xl bg-center bg-cover duration-500">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={import.meta.env.VITE_LOCAL_IMG_PATH + slide.imgURL}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 object-cover rounded-xl w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2 mt-3">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-8 w-8 flex items-center justify-center cursor-pointer ${
              slideIndex === currentIndex ? "text-red-900" : "text-red-500"
            }`}
          >
            <RxDotFilled size={30} />
          </div>
        ))}
      </div>
    </div>
  );
}
