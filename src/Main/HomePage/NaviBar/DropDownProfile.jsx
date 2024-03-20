import React from "react";
import { Link } from "react-router-dom";

const listStyle = "hover:font-bold hover:pointer";
export default function DropDownProfile() {
  return (
    <div className="flex flex-col absolute dropdown md:right-8 md:top-11 md:p-6 right-20 top-9 p-4 border px-8 border-gray-300 rounded bg-white z-20 text-red-700">
      <ul className="flex flex-col gap-4">
        <li className={listStyle}>Profile</li>
        <li className={listStyle}>Setting</li>
        <li className={listStyle}>
          <Link to="/sign-in">LogIn</Link>
        </li>
        <li className={listStyle}>
          <Link to="/admin">Admin Panel</Link>{/*Ravindu - i add this temporary link as admin panel  */}
        </li>
      </ul>
    </div>
  );
}
