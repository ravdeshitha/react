import axios from "axios";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

//styles
const h1Style = "text-4xl text-red-900 font-bold text-center mb-6";

const inputStyle =
  "block w-full py-2 px-0 text-md font-bold text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer focus:font-bold ";

const labelStyle =
  "absolute text-red-900 text-md duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

const inputBoxStyle = "relative mt-8";

const iconStyle = "absolute top-4 right-4 text-red-900";

let activeBtnStyle =
  "w-full p-1 mb-4 text-[18px] mt-6 rounded-full border-2 border-red-900  bg-red-900 text-white hover:bg-red-950";

let unActiveBtnStyle =
  "w-full p-1 mb-4 text-[18px] mt-6 rounded-full border-2 border-red-900  bg-white text-red-900 hover:bg-red-800 hover:text-white border-2 border-red-900";

export default function SignUpForm() {
  const [user, setUser] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [error, setError] = useState(null);

  const handleInput = (element) => {
    setUser((prev) => ({
      ...prev,
      [element.target.name]: element.target.value,
    }));
  };
  // Password is incorect
  const checkPasswordMatch = () => {
    setPasswordMatch(user.password === user.confirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setError("Passwords do not match.");
    }

    setError(null);

    axios
      .post("https://test-repo-2xuo.onrender.com/api/user/register", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" bg-white p-5 lg:bg-opacity-0">
      <h1 className={h1Style}>Sign Up</h1>
      <div></div>
      <div>
        <form action="">
          {/* <<<< ---- Full Name Input field ---- >>>>*/}
          <div className={inputBoxStyle}>
            <input
              type="text"
              placeholder=""
              className={inputStyle}
              name="fullName"
              value={user.fullName}
              onChange={handleInput}
            />
            <label htmlFor="" className={labelStyle}>
              Full Name
            </label>
            <FaUserAlt className={iconStyle} />
          </div>

          {/* <<<< ---- Phone Number Input field ---- >>>>*/}
          <div className={inputBoxStyle}>
            <input
              type="text"
              placeholder=""
              className={inputStyle}
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInput}
            />
            <label htmlFor="" className={labelStyle}>
              Phone Number
            </label>
            <FaPhoneAlt className={iconStyle} />
          </div>

          {/* <<<< ---- Password Input field ---- >>>>*/}
          <div className={inputBoxStyle}>
            <input
              type="password"
              placeholder=""
              className={inputStyle}
              name="password"
              value={user.password}
              onChange={handleInput}
              onBlur={checkPasswordMatch}
            />
            <label htmlFor="" className={labelStyle}>
              Password
            </label>
            <FaUnlockAlt className={iconStyle} />
          </div>

          {/* <<<< ---- Confirm Password Input field ---- >>>>*/}
          <div className={inputBoxStyle}>
            <input
              type="password"
              placeholder=""
              className={inputStyle}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInput}
              onBlur={checkPasswordMatch}
            />
            <label htmlFor="" className={labelStyle}>
              Confirm Password
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
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          {/* <<<< ---- Display Error if pswd =! cpswd field ---- >>>>*/}
          {error && <div style={{ color: "red" }}>{error}</div>}

          <Link to="/sign-in">
            <button className={unActiveBtnStyle} type="submit">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
