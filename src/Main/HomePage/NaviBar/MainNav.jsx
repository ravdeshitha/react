import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import wasanaLogo from "./Assests/wasana-logo.png";
import DropDownProfile from "./DropDownProfile";
import PropTypes from "prop-types"; // Import PropTypes

const styleTab =
  "text-red-700 font-[poppins] font-bold p-5 hover:pointer hover:text-red-500 hover:drop-shadow-lg";

export default function NavBar({ scrollToTarget }) {
  const [click, setClick] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // const handleClickDropDown = () => {
  //   setUserDropDown(!userDropDown);
  //   setClick(false);
  // };

  const handleOnClick = () => {
    setClick(!click);
    setUserDropDown(false);
  };

  const handleSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { id: sectionId } });
    } else {
      scrollToTarget(sectionId);
    }
  };

  const content = (
    <ul className="bg-slate-100 text-center md:hidden ">
      <button>
        <li className={styleTab}>Home</li>
      </button>
      <button onClick={() => scrollToTarget("services")}>
        <li className={styleTab}>Services</li>
      </button>
      <button>
        <li className={styleTab}>Gallery</li>
      </button>
      <button>
        <li className={styleTab}>About Us</li>
      </button>
      <button>
        <li className={styleTab}>Contact</li>
      </button>
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
              <button
                onClick={() => {
                  handleSection("mainSlideShow");
                }}
              >
                {/* <Link to="/"> */}
                <li className={styleTab}>Home</li>
                {/* </Link> */}
              </button>
              <button
                onClick={() => {
                  handleSection("services");
                }}
              >
                <li className={styleTab}>Services</li>
              </button>
              <button
                onClick={() => {
                  handleSection("events");
                }}
              >
                <li className={styleTab}>Events</li>
              </button>

              <button
                onClick={() => {
                  handleSection("about");
                }}
              >
                <li className={styleTab}>About Us</li>
              </button>

              <button
                onClick={() => {
                  handleSection("owners");
                }}
              >
                <li className={styleTab}>Owners</li>
              </button>

              <button
                onClick={() => {
                  handleSection("contact");
                }}
              >
                <li className={styleTab}>Contact</li>
              </button>
              <button>
                <Link to="/gallery">
                  <li className={styleTab}>Gallery</li>
                </Link>
              </button>
            </ul>
          </div>

          {/* userlogin */}
          <div className="flex items-center gap-6 mr-5 ">
            <button
              className="bg-red-800 text-[25px] text-white px-1 py-1 rounded-full hover:bg-slate-200 hover:text-red-600"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaRegUserCircle />

              {isVisible && <DropDownProfile />}
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

// Prop validation
NavBar.propTypes = {
  scrollToTarget: PropTypes.func.isRequired, // Function to scroll to a target
};
