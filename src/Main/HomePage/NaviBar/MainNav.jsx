import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import wasanaLogo from "./Assests/wasana-logo.jpg";
import DropDownProfile from "./DropDownProfile";

const styleTab =
  "text-red-700 font-[poppins] font-bold p-5 hover:pointer hover:text-red-500 hover:drop-shadow-lg";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);

  const handleClickDropDown = () => {
    setUserDropDown(!userDropDown);
    setClick(false);
  };

  const handleOnClick = () => {
    setClick(!click);
    setUserDropDown(false);
  };

  const content = (
    <ul className="bg-slate-100 text-center md:hidden ">
      <Link to="/">
        <li className={styleTab}>Home</li>
      </Link>
      <Link to="/">
        <li className={styleTab}>About Us</li>
      </Link>
      <Link to="/">
        <li className={styleTab}>Services</li>
      </Link>
      <Link to="/gallery">
        <li className={styleTab}>Gallery</li>
      </Link>
      <Link to="/">
        <li className={styleTab}>Contact</li>
      </Link>
    </ul>
  );
  return (
    <div>
      <div className="fixed w-screen bg-white z-50">
        <div className="justify-between flex w-full items-center">
          {/* logo */}
          <div className="ml-3">
            <img src={wasanaLogo} alt="" className="w-[50px] md:w-[70px]" />
          </div>

          {/* tab */}
          <div className="hidden md:flex md:static absolute ">
            <ul className="flex transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}">
              <Link to="/">
                <li className={styleTab}>Home</li>
              </Link>
              <Link to="/">
                <li className={styleTab}>About Us</li>
              </Link>
              <Link to="/">
                <li className={styleTab}>Services</li>
              </Link>
              <Link to="/gallery">
                <li className={styleTab}>Gallery</li>
              </Link>
              <Link to="/">
                <li className={styleTab}>Contact</li>
              </Link>
            </ul>
          </div>

          {/* userlogin */}
          <div className="flex items-center gap-6 mr-5 ">
            <button
              className="bg-slate-300 text-white px-1 py-1 rounded-full hover:bg-slate-200 hover:text-red-600"
              onClick={handleClickDropDown}
            >
              <FaRegUserCircle />

              {userDropDown && <DropDownProfile />}
            </button>
            <button
              onClick={handleOnClick}
              className="text-2xl text-slate-500 cursor-pointer md:hidden transition"
            >
              {click ? <IoClose /> : <RiMenu3Fill />}
            </button>
          </div>
        </div>
        <div>{click && content}</div>
      </div>
    </div>
  );
}
