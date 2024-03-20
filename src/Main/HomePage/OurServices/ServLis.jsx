import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { GiCakeSlice } from "react-icons/gi";

export default function ServLis({
  children,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div>
      <div className="flex">
        {children.map((service, index) => (
          <div
            key={index}
            className="flex transition-transform ease-out duration-[500ms] w-full bg-white"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <div className="w-[100vw] md:flex">
              {/* <p>{service.companyName}</p>
              <p>{service.title}</p>
              <img src={service.backImg} alt="" className="h-500 " />
              <img src={service.frontImg} alt="" className="h-400" /> */}
              <div className="w-full md:w-[40%]">
                <img
                  // first image bottom image
                  src={service.backImg}
                  alt=""
                  className=" absolute  w-full md:w-[250px] md:h-[250px]  h-[300px] object-cover m-5 float-left z-0 drop-shadow-2xl"
                />
                <img
                  // second image top
                  src={service.frontImg}
                  alt=""
                  className=" relative  md:mt-[300px] bottom-20  md:w-[250px] md:h-[250px] w-[300px] h-[300px] object-cover  float-right z-10 drop-shadow-2xl shadow-5xl"
                />
              </div>
              <div className="absolute mt-[400px] md:-mt-[00px]  w-full md:relative text-center items-center md:w-[60%] ">
                <h1 className="text-4xl md:text-6xl text-red-700 font-[poppins] font-black text-shadow-sm  md:p-5">
                  {/* Campany name */}
                  {service.companyName}
                  
                </h1>

                <div className="p-5">
                  <div className="text-xl text-blue-700 font-semibold font-[poppins] text-center md:float-left">
                    {/* sub heading */}
                    {service.title}
                  </div>
                  <div>
                    {/* logo */}
                    <img src="" alt="" />
                    <GiCakeSlice className="hidden md:block text-8xl float-right mr-20" />
                  </div>
                </div>
                {/* description */}
                <div className="block text-justify md:mt-10 md:p-10 px-10">
                  {service.description}
                </div>

                <button className="bg-red-800 rounded-full w-[fit-content] px-5 py-1 m-5 text-white font-bold font-[poppins]">
                  {/* need to change & include link tab and link */}
                  Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute w-[80vw] mx-auto inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {children.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-black rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Add prop types validation
ServLis.propTypes = {
  children: PropTypes.node.isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};
