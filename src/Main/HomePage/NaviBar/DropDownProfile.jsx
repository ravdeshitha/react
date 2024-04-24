import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const listStyle =
  "hover:bg-slate-100 hover:pointer w-full hover:text-red-950  text-lg py-1 px-4 rounded-xl";
export default function DropDownProfile() {
  // Check if user data exists in localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const { logout } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(true);

  const handleLogOut = async () => {
    const result = await logout();
    console.log(result);
    window.location.reload();
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div
          onMouseLeave={handleMouseLeave}
          className="flex flex-col absolute dropdown md:right-8 md:top-8 md:p-6 right-20 top-9 p-4 border px-8 border-gray-300 rounded bg-white z-20 text-red-700"
        >
          <ul className="flex flex-col gap-4">
            {/* <li className={listStyle}>Profile</li> */}
            {/* <li className={listStyle}>Setting</li> */}
            {/* Conditionally render LogIn/LogOut button */}
            {user ? (
              <li className={listStyle} onClick={handleLogOut}>
                Log Out
              </li>
            ) : (
              <Link to="/sign-in">
                <li className={listStyle}>LogIn</li>
              </Link>
            )}
            {/* Conditionally render Admin Panel link based on usertype */}
            {user && user.userType === "admin" && (
              <Link to="/protect/admin/main">
                <li className={listStyle}>Admin Panel</li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
