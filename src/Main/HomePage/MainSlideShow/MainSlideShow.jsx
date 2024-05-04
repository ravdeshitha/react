import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cover1 from "../OurServices/assets/sweet-pastry-assortment-top-view.jpg";
import Cover2 from "../OurServices/assets/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg";
import Cover3 from "../OurServices/assets/flat-lay-table-full-delicious-food-composition.jpg";
import Cover4 from "../OurServices/assets/set-various-bread-stone-surface.jpg";
import MainSVG from "./assets/main_cover.png";
import MainSVG1 from "./assets/main_cover2.png";
import Logoset from "./LogoSet/Logoset";
import axios from 'axios';


export default function MainSlideShow({
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER}/api/mainHome/slideImages`)
      .then(res => {
        setSlides(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const prev = () =>
    setCurr(curr => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr(curr => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide || slides.length === 0) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);
  
  return (
    <div className="h-[100vh] bg-blue-400">
      <div className="hidden md:block absolute z-30 ">
        <img
          src={MainSVG1}
          alt=""
          className="h-[100vh] w-screen object-cover"
        />

        <div className=" z-40 absolute bottom-[60vh]  w-[38vw] ml-[58vw] text-5xl text-center font-[poppins] font-bold text-red-700 ">
          <div>Wasana Bakers Pvt Ltd</div>
          <div className=" w-full h-20 m-auto">
            <Logoset />
          </div>
        </div>
      </div>
      <div className="flex overflow-clip">
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{ transform: `translateX(-${curr * 100}%)` }}
            className="flex transition-transform ease-out duration-[1000ms]"
          >
            <div className="bg-black w-screen h-screen">
              <img
                src={import.meta.env.VITE_LOCAL_IMG_PATH + slide.imageUrl}
                alt="image "
                className=" w-[100vw] h-screen object-cover z-0 "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add prop types validation
MainSlideShow.propTypes = {
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};
