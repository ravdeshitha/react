import React from "react";
import bgImage from "./assets/meeting-room-office.jpg";

export default function SidePhoto() {
  return (
    <div className="absolute lg:relative z-0 lg:w-1/2 h-full lg:flex lg:flex-col">
      <img src={bgImage} alt="" className="w-full lg:h-full object-cover" />
      <div className="absolute top-5 left-[10%] flex flex-col">
        <h1 className="text-4xl text-slate-50 font-bold ">Welcome</h1>
        <p className="text-xl text-white font-sans mt-5 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          architecto?
        </p>
      </div>
    </div>
  );
}
