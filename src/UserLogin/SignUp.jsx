import React from "react";
import SidePhoto from "./SignPages/SidePhoto";
import SignUpForm from "./SignPages/SignUpForm";

export default function SignUp() {
  return (
    <div className="md:mt-[15vh] w-[95%] md:w-[55%]  mt-10 flex lg:flex-col justify-center mx-auto drop-shadow-2xl border-4 border-slate-150">
      <div className="w-full h-[70vh] flex item-start">
        <SidePhoto />

        <div className="absolute lg:relative z-20 w-full lg:w-1/2 h-full lg:flex lg:flex-col justify-center">
          <div className="mx-5 mt-[25vh] lg:bg-opacity-10 lg:mt-0 ">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
