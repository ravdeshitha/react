import React, { useEffect, useState } from "react";
import image1 from "./assets/01.jpg";
import image2 from "./assets/02.jpg";
import image3 from "./assets/03.jpg";
import image4 from "./assets/04.jpg";
import image5 from "./assets/05.jpg";
import image6 from "./assets/06.jpg";
import image7 from "./assets/07.jpg";
import image8 from "./assets/08.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const imageArr2 = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image1,
];

function GalleryAlbum() {
  const [imageArr, setImageArr] = useState([]);
  const { id } = useParams();
  const [col, setCol] = useState("none");
  const [indexNo, setIndexNo] = useState();
  // console.log(id);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/mainHome/gallery/photos/${id}`)
      .then((res) => {
        // const photosData = res.data.result;
        setImageArr(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(imageArr[1] && imageArr[1].albumId);

  const colSelect = (e) => {
    setCol(e.target.value);
  };


  return (
    <div className=" w-full ">
      {/* <div className="mt-20"></div> */}
      <div className="fixed text-4xl font-bold m-auto mb-5 px-10  w-[100%] h-[150px] pt-[75px]  bg-slate-100">
        <div className="   flex justify-between mb-1">
          <div>
            <div className="capitalize font-[poppins]">
              {imageArr[0] && imageArr[0].albumName}
            </div>
            <div className="text-lg text-slate-500 capitalize flex gap-5">
              {imageArr[0] && imageArr[0].category}{" "}
              <div className="w-[2px] bg-slate-500 h-7"></div>
              <div>{imageArr[0] && imageArr.length} items</div>
            </div>
          </div>
          <div className="text-lg ">
            <select
              className="bg-slate-400 outline-none rounded-md p-1 mt-7"
              name=""
              id=""
              onChange={colSelect}
            >
              <option value="none">Select Columns</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
        <div className="border-b-2 border-slate-700/50 "></div>
      </div>
      <div className="h-[160px]"></div>

      <div className="w-[95%] m-auto">
        <div
          className={`columns-2 gap-3 lg:gap-3 sm:columns-3 lg:columns-${
            col === "none" ? 5 : col
          } md:columns-4 xl:columns-${col} ${
            col !== "none" &&
            "[&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8"
          }`}
        >
          {imageArr.map((image, index) => (
            <div key={index}>
              <img
                className="pb-3"
                src={import.meta.env.VITE_LOCAL_IMG_PATH + image.imgURL}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryAlbum;
