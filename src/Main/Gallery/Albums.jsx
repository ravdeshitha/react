import React, { useEffect, useState } from "react";
import Album from "./Album";
import axios from "axios";

import Slideshow from "./Slideshow";
import GalleryNavigation from "./GalleryNavigation/GalleryNavigation";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [albumCategory, setAlbumCategory] = useState('bakery');
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/mainHome/gallery/albums`)
      .then((res) => {
        const albumsData = res.data.result;
        setAlbums(albumsData);
        // console.log("this");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="h-20"></div>

      <div>
        {/* NEW GALLERY NAVIGATION BAR DESIGN BY RAVINDU */}
        <GalleryNavigation setAlbumCategory={setAlbumCategory}/>

        {/* <ServiceNavBar /> */}
      </div>
      <Slideshow category={albumCategory}/>
      <div className="max-w-[1550px] h-[400px] w-full mt-0 m-auto py-5 px-6 relative group flex flex-wrap">
        {albums.map((album, index) => {
          if(album.category === albumCategory){
            return (
              <div key={index}>
                <Album album={album}></Album>
              </div>
            );
          } else {
            return null; // or any other JSX you want to render if the category doesn't match
          }
        })}
      </div>
    </div>
  );
}
