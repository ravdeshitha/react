import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//styles
const h1Style = "text-4xl text-red-900 font-bold text-center mb-6";

const inputStyle =
  "block w-full py-2 px-0 text-md font-bold text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer focus:font-bold ";

const labelStyle =
  "absolute text-red-900 text-md duration-300 transform -translate-y-6 scale-75 top-3 z-40 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

const inputBoxStyle = "relative mt-8";

const iconStyle = "absolute top-4 right-4 text-red-900";

let activeBtnStyle =
  "w-full p-1 mb-4 text-[18px] mt-6 rounded-full border-2 border-red-900  bg-red-900 text-white hover:bg-red-950";

let unActiveBtnStyle =
  "w-full p-1 mb-4 text-[18px] mt-6 rounded-full border-2 border-red-900  bg-white text-red-900 hover:bg-red-800 hover:text-white border-2 border-red-900";

export default function SignInForm({setUser,userSubmit}) {
  
  const handleInput = (element) => {
    setUser((prev) => ({
      ...prev,
      [element.target.name]: element.target.value,
    }));
  };


  return (
    <div className=" bg-white p-5 lg:bg-opacity-0">
      <h1 className={h1Style}>Sign In</h1>
      <div></div>
      <div>
        <form action="" onSubmit={userSubmit} autoComplete="off">
          <div className={inputBoxStyle}>
            <input
              type="text"
              placeholder=""
              className={inputStyle}
              name="phoneNumber"
              onChange={handleInput}
              required
            />
            <label htmlFor="" className={labelStyle}>
              Phone Number
            </label>
            <FaPhoneAlt className={iconStyle} />
          </div>

          <div className={inputBoxStyle}>
            <input
              type="password"
              placeholder=""
              className={inputStyle}
              name="password"
              onChange={handleInput}
              required
            />
            <label htmlFor="" className={labelStyle}>
              Password
            </label>
            <FaUnlockAlt className={iconStyle} />
          </div>

          <div className="mt-10 flex justify-between items-center">
            <div className="flex gap-2 items-center text-red-900">
              <input type="checkbox" name="" id="" />
              <label htmlFor="Remember Me">Remember Me</label>
            </div>
            <span className="text-red-900 text-opacity-70 hover:underline hover:opacity-[100%] hover:cursor-pointer">
              Forgot Password?
            </span>
          </div>
          <button
            className={activeBtnStyle}
            type="submit"
          >
            Sign In
          </button>

          <Link to="/sign-up">
            <button className={unActiveBtnStyle} type="submit">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
