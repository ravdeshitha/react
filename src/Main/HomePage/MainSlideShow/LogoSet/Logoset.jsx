import React, { useEffect, useState } from "react";
import FancyCarousel from "react-fancy-circular-carousel";
import "react-fancy-circular-carousel/FancyCarousel.css";
// import "./Logoset.css";
// import Info1 from "./Info1";

import WBakers_logo from "./assets/wasana.png";
import WGimanhala_logo from "./assets/gimnahala.png";
import ReceptionHall_logo from "./assets/receptionhall.png";
import CleanService_logo from "./assets/clean.png";
import WBuilder_logo from "./assets/build.png";
import Raigam from "./assets/raigam.png";

export default function Logoset() {
  const [focusElement, setFocusElement] = useState(0);
  const [index, setIndex] = useState(0);
  const images = [
    WBakers_logo,
    WGimanhala_logo,
    ReceptionHall_logo,
    CleanService_logo,
    WBuilder_logo,
    Raigam,
  ];

  const info = [
    // <Info1 />,
    "Wasana Bakers",
    "Wasana Gimanhala",
    "Reception Hall",
    "Clean & Service",
    "Builders & Engineering",
    "Raigam",
  ];

  // Callback function to update focusElement
  const updateFocusElement = (newFocusElement) => {
    setFocusElement(newFocusElement);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusElement((prevFocus) => (prevFocus === 5 ? 0 : prevFocus + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <div className="flex item mt-20 relative">
      {/* <div className="w-ful h-5 bg-red-500">hw</div> */}
      <div className="main  absolute left-[80px] mt-10 ">
        <FancyCarousel
          images={images}
          focusElement={focusElement} // Pass the current focusElement as a prop
          onUpdateFocusElement={updateFocusElement} // Pass the callback function as a prop
          carouselRadius={180}
          peripheralImageRadius={50}
          centralImageRadius={80}
          focusElementStyling={{ border: "2px solid #ba4949" }}
          autoRotateTime={2}
          borderWidth={0}
          borderHexColor={"1c364f"}
        />
      </div>
      <div className="info-box-wrapper mt-[470px] w-[92%]">
        <p className="text-xl opacity-50 m-auto"> {info[focusElement]} </p>
      </div>
    </div>
  );
}
