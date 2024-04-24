import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import PropTypes from "prop-types"; // Import PropTypes
import { FaAngleDoubleRight } from "react-icons/fa";

export default function SlideShow({ slides }) {
  // const [slides, setSlides] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState("");

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
    <div className="max-w-[1450px] h-[70vh] w-full m-auto px-4 relative group">
      <div className="w-full h-[65vh] rounded-xl bg-center bg-cover duration-500">
        {slides.map((slide, index) => (
          <div
            key={index}
            // src={slide.backImg}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 object-cover rounded-xl w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className=" w-full h-full">
              {/* backImage */}
              {/* frontImage */}
              {/* company name */}
              {/* title */}
              {/* description */}
              <div className="flex gap-0 px-20 h-full">
                <div className="w-2/5 h-full  ">
                  <div className="w-full flex justify-between relative items-center h-full pt-10">
                    <div className="w-[18vw] h-[45vh] mb-[5rem] -rotate-12 bg-slate-500 our-service-box-shadow">
                      <img
                        src={slide.backImg}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[18vw] h-[45vh] mt-20 absolute right-20 rotate-12 bg-slate-400 our-service-box-shadow">
                      <img
                        src={slide.frontImg}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-3/5 h-full ">
                  <div className="h-2/5 w-full flex items-center justify-stsrt">
                    <h1
                      // data-aos="fade-left"
                      className={`text-4xl md:text-6xl  text-center font-[poppins] font-black md:py-5 ${slide.color}`}
                    >
                      {/* Campany name */}
                      {slide.companyName}
                    </h1>
                  </div>
                  <div className="h-3/5 w-full  flex">
                    <div className="w-3/5 h-full ">
                      <div>
                        <h1
                          className={`text-3xl mt-5 font-bold ${slide.titleColor}`}
                        >
                          {slide.title}
                        </h1>
                      </div>
                      <div>
                        <p className="text-2xl mt-10 text-center text-gray-700">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-2/5 h-full ">
                      <div className="h-3/4 w-full  flex items-center">
                        <img src={slide.logo} alt="" />
                      </div>
                      <div className="h-1/4 w-full flex justify-end items-center relative">
                        <button
                          className={`font-black ${slide.bgColor} p-2 px-5 rounded-full text-white m-auto absolute `}
                        >
                          {/* ${slide.color} */}
                          <div className="flex items-center">
                            {/* did you add visit link please call chathuranga */}
                            <span className="pr-2">Visit </span>
                            <FaAngleDoubleRight />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

// Add prop validation
SlideShow.propTypes = {
  slides: PropTypes.array.isRequired, // Specify the required shape of the 'album' prop
};
