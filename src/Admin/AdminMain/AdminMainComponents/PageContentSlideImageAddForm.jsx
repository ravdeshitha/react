import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { ImCross } from "react-icons/im";

function PageContentSlideImageAddForm({setSlideFormState}) {
  const { currentUser } = useContext(AuthContext);

  const [slideImage, setSlideImage] = useState(null);
  const [slideData,setSlideData] = useState({uploadedBy : currentUser.adminId});
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try{
        const formData = new FormData();
        formData.append('slideIMG', slideImage);
        formData.append('slideData', JSON.stringify(slideData));
        await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/slideImage`, formData, { withCredentials: true })
        .then(res =>{
            console.log(res.data);
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        })
        
    }
    catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    if (slideImage) {
        setPreview(URL.createObjectURL(slideImage));
    } else {
        setPreview(null);
    }

    return () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
    };
}, [slideImage]);

  const handleCross = () =>{
    setSlideFormState(true);
  }

  return (
    <div>
      <div className="relative">
        <h3 className='text-center text-[28px] font-bold mb-4 text-slate-800 pt-10'>Add Slide Image</h3>
        <div className="w-7 h-7 border-2 border-slate-700 rounded-lg absolute top-3 right-3 p-1 cursor-pointer" onClick={handleCross}>
          <ImCross />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='field mt-3 relative'>
          <input type='file' className='absolute w-full h-52 opacity-0 cursor-pointer z-20' onChange={(e)=> setSlideImage(e.target.files[0])} ></input>
          
          <div className='w-full h-52 bg-slate-400'>
          {preview && <img className='inset-0 w-full h-full  object-cover' src={preview} />}
          {!preview && 
            <div className="absolute w-full h-52 flex justify-center items-center font-bold">
              <h3 className="">1920 X 1080</h3>
            </div>
          }
          </div>

          
        </div>

        <div className="field">
          <button className="bg-neutral-900 text-white font-semibold mt-5 p-2 w-full rounded" type="submit">Add Image</button>
        </div>
      </form>
    </div>
  )
}

export default PageContentSlideImageAddForm