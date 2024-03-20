import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { GiCakeSlice } from "react-icons/gi";
import AOS from "aos"; /* for animation  aos package*/
import "aos/dist/aos.css";

export default function ServiceBody({
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
  });

  /* for animation part */
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);

  return (
    <div>
      <div className="flex">
        {/* <div className="z-20 mx-auto inset-0 flex items-center justify-between">
          <button
            onClick={prev}
            className=" p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white opacity-50 hover:opacity-100"
          >
            <ChevronLeft size={40} />
          </button>
        </div> */}

        <div className="flex overflow-hidden ">
          {children.map((service, index) => (
            <div
              key={index}
              className="flex transition-transform ease-out duration-[500ms] w-full mt-5 "
              style={{ transform: `translateX(-${curr * 100}%)` }}
            >
              <div className="w-[100vw] md:flex">
                <div className="w-full md:w-[50%]">
                  <img
                    // first image bottom image
                    data-aos="fade-down"
                    src={service.backImg}
                    alt=""
                    className=" absolute  w-[250px] md:w-[250px] md:h-[250px]  h-[250px] object-cover m-5 float-left z-0 drop-shadow-xl"
                  />
                  <img
                    data-aos="fade-up"
                    // second image top
                    src={service.frontImg}
                    alt=""
                    className="relative  bottom-[300px] md:mt-[250px] mx-5 md:mx-0 mt-[400px] md:bottom-[50px]  md:w-[250px] md:h-[250px] w-[250px] h-[250px] object-cover  float-right z-10 drop-shadow-2xl shadow-5xl"
                  />
                </div>
                <div className="absolute mt-[400px] md:-mt-[00px]  w-full md:relative text-center items-center md:w-[60%] ">
                  <h1
                    data-aos="fade-left"
                    className={`text-4xl md:text-6xl  font-[poppins] font-black text-shadow-sm  md:p-5 ${service.color}`}
                  >
                    {/* Campany name */}
                    {service.companyName}
                  </h1>

                  <div className="p-5">
                    <div
                      data-aos="fade-right"
                      className={`text-xl  font-semibold font-[poppins] text-center md:float-left ${service.titleColor}`}
                    >
                      {/* sub heading */}
                      {service.title}
                    </div>
                    <div data-aos="fade-left">
                      {/* logo */}
                      <img src="" alt="" />
                      <GiCakeSlice className="hidden md:block text-8xl float-right mr-20" />
                    </div>
                  </div>
                  {/* description */}
                  <div
                    data-aos="fade-up"
                    className="block text-justify md:mt-10 md:p-10 px-10 line-clamp-1"
                  >
                    {service.description}
                  </div>

                  <button
                    data-aos="fade-up"
                    className="bg-red-800 rounded-full w-[fit-content] px-5 py-1 m-5 text-white font-bold font-[poppins]"
                  >
                    {/* need to change & include link tab and link */}
                    Visit
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="static inset-0 flex items-center justify-between p-4 w-[65vw] mt-[150px] m-auto">
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
        </div>
        {/* <div className="relative ">
          <div className="absolute w-[80vw] z-20 mx-auto inset-0 flex items-center justify-between">
            <button
              onClick={next}
              className=" p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white opacity-50 hover:opacity-100"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div> */}
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
ServiceBody.propTypes = {
  children: PropTypes.node.isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};
