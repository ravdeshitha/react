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
import { ImCross } from "react-icons/im";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CgZoomIn } from "react-icons/cg";
import { CgZoomOut } from "react-icons/cg";
import { TbZoomReset } from "react-icons/tb";

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
  const [preview, setPreview] = useState();
  const [prevOpen, setPrevOpen] = useState(false);
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

  const handlePrev =(image) =>{
    setPrevOpen(true);
    setPreview(image);
    console.log(image)
  }

  const handleCross = () =>{
    setPrevOpen(!prevOpen);
  }
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
                onClick={()=>handlePrev(import.meta.env.VITE_LOCAL_IMG_PATH + image.imgURL)}
              />
            </div>
          ))}
        </div>
      </div>

      <div 
        className={`${prevOpen ? 'visible' : 'hidden'} w-full h-[100vh] fixed z-30 bg-slate-500 top-0 pt-24`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(55,55,55,0.3))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div className="w-7 h-7 border-2 border-slate-200 rounded-lg absolute top-[75px] right-3 p-1 cursor-pointer" onClick={handleCross}>
          <ImCross />
        </div>
        
        <div className="h-[85vh] w-[90%] m-auto flex justify-center">
          <div className="h-[85vh] box-shadow-2 relative">
            <TransformWrapper>
              {({ zoomIn, zoomOut,resetTransform, ...rest }) => (
                  <>
                    <div className="absolute top-0 -right-12 flex flex-col gap-3">
                      <button
                        className="w-8 h-8 bg-slate-100 rounded-sm shadow-md flex justify-center items-center"
                        onClick={() => {
                          zoomIn();
                        }}
                      >
                        <CgZoomIn className="w-6 h-6 text-slate-700"/>
                      </button>
                      <button
                        className="w-8 h-8 bg-slate-100 rounded-sm shadow-md flex justify-center items-center"
                        onClick={() => {
                          zoomOut();
                        }}
                      >
                        <CgZoomOut className="w-6 h-6 text-slate-700"/>
                      </button>
                      <button
                        className="w-8 h-8 bg-slate-100 rounded-sm shadow-md flex justify-center items-center"
                        onClick={() => {
                          resetTransform();
                        }}
                      >
                        <TbZoomReset className="w-6 h-6 text-slate-700"/>
                      </button>
                    </div>
                    <TransformComponent>
                      <img src={preview}  className="h-[85vh]"/>
                    </TransformComponent>
                  </>
                )}
            </TransformWrapper>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default GalleryAlbum;