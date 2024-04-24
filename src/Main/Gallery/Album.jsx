import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";

export default function Album({ album }) {
  return (
    <Link to={`/gallery/album/${album.albumId}`}>
      <div className="w-[250px] h-[250px]  mb-5">
        <div className="w-[200px]    m-auto ">
          <div className="h-[200px] rounded-xl bg-slate-600">
            <img
              src={import.meta.env.VITE_LOCAL_IMG_PATH + album.imgURL}
              alt="this is image"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <p className="font-bold font-[poppins]">{album.albumName}</p>
          <p className="">{album.numImg} items</p>
        </div>
      </div>
    </Link>
  );
}

// Add prop validation
Album.propTypes = {
  album: PropTypes.object.isRequired, // Specify the required shape of the 'album' prop
};
