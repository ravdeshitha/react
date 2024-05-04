import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { SketchPicker } from 'react-color';

function PageContentServiceAddForm({setServiceFormState}) {
    const { currentUser } = useContext(AuthContext);

    const [nameColor, setNameColor] = useState('lightblue');
    const [titleColor, setTitleColor] = useState('lightblue');
    
    const [picker1, setpicker1] = useState(false);
    const [picker2, setpicker2] = useState(false);

    const [logoImg, setLogoImg] = useState(null);
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [addService, setAddService] = useState({
        serviceName: '',
        serviceTitle: '',
        serviceDesc: '',
        serviceUrl: '',
        modifiedBy: currentUser.adminId,
    });
    
    const [previews, setPreviews] = useState({
        logoImg: null,
        img1: null,
        img2: null
    });

    const addServiceDetails = (e) => {
        setAddService((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleAddService = async (e) =>{
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append('seviceIMG', logoImg);
            formData.append('seviceIMG', img1);
            formData.append('seviceIMG', img2);
            formData.append('serviceData', JSON.stringify(addService));
            formData.append('nameColor', JSON.stringify(nameColor));
            formData.append('titleColor', JSON.stringify(titleColor));
            await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/services`, formData, { withCredentials: true })
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
        const pimage = [logoImg, img1, img2];
        const simage = ['logoImg', 'img1', 'img2'];
        
        const updatedPreviews = {};
        let cleanupFunctions = [];
    
        for (let i = 0; i < pimage.length; i++) {
            const image = pimage[i];
            const prev = simage[i];
    
            if (!image) {
                updatedPreviews[prev] = null;
                continue;
            }
    
            const imageUrl = URL.createObjectURL(image);
            updatedPreviews[prev] = imageUrl;
    
            cleanupFunctions.push(() => {
                URL.revokeObjectURL(imageUrl);
            });
        }
    
        setPreviews(updatedPreviews);
    
        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [logoImg, img1, img2]);

    const handleCross = () =>{
        setServiceFormState('table');
    }

  return (
    <div className='' >
        <div className="relative">
            <h3 className='text-center text-[25px] font-bold text-slate-700 mt-2'>Add New Service</h3>

            <div className="w-7 h-7 border-2 border-slate-700 rounded-lg absolute top-0 right-3 p-1 cursor-pointer" onClick={handleCross}>
                <ImCross />
            </div>
        </div>

        <form onSubmit={handleAddService}>
            <div className="w-[90%] m-auto flex gap-4">
                <div className='w-[50%] field mt-1'>
                    <label className='label'>Service Name :</label>
                    <input className='adminFormInput' type='text' name='serviceName' onChange={addServiceDetails}/>
                    <div className="w-10 h-6 mt-2 rounded-md relative" style={{ backgroundColor: `${nameColor}` }} onClick={() => setpicker1(!picker1)} >
                        {picker1 && <SketchPicker className="absolute top-[-35px] left-10 z-20" color={nameColor} onChange={updatedColor => setNameColor(updatedColor.hex)}/>}
                    </div>
                </div>
                <div className='w-[50%] field mt-1'>
                    <label className='label'>Service Title :</label>
                    <input className='adminFormInput' type='text' name='serviceTitle' onChange={addServiceDetails}/>
                    <div className="w-10 h-6 mt-2 rounded-md relative" style={{ backgroundColor: `${titleColor}` }} onClick={() => setpicker2(!picker2)} >
                        {picker2 && <SketchPicker className="absolute top-[-35px] left-10 z-20" color={titleColor} onChange={updatedColor => setTitleColor(updatedColor.hex)}/>}
                    </div>
                </div>
            </div>
            
            <div className="w-[90%] m-auto flex gap-4">
                <div className='w-[50%] field mt-1'>
                    <label className='label'>Description :</label>
                    <textarea className='adminFormInput h-16 resize-none' type='text' name='serviceDesc' onChange={addServiceDetails}></textarea>
                </div>
                <div className='w-[50%] field mt-1'>
                    <label className='label'>Service URL :</label>
                    <textarea className='adminFormInput h-16 resize-none' type='text' name='serviceUrl'onChange={addServiceDetails}></textarea>
                </div>
            </div>

            

            <div className="w-[90%] m-auto flex">
                <div className='field mt-2'>
                    <label className='label'>Logo :</label>
                    <div className='w-28 h-32 bg-slate-400'>
                        {previews.logoImg && <img className='inset-0 w-full h-full  object-cover' src={previews.logoImg} />}
                    </div>

                    <input type='file' className='absolute w-28 h-36 opacity-0 cursor-pointer' onChange={(e) => setLogoImg(e.target.files[0])} ></input>
                </div>
                <div className='field mt-2'>
                    <label className='label'>Image-01 :</label>
                    <div className='w-28 h-32 bg-slate-400'>
                        {previews.img1 && <img className='inset-0 w-full h-full  object-cover' src={previews.img1} />}
                    </div>

                    <input type='file' className='absolute w-28 h-36 opacity-0 cursor-pointer' onChange={(e) => setImg1(e.target.files[0])} ></input>
                </div>
                <div className='field mt-2'>
                    <label className='label'>Image-02 :</label>
                    <div className='w-28 h-32 bg-slate-400'>
                        {previews.img2 && <img className='inset-0 w-full h-full  object-cover' src={previews.img2} />}
                    </div>

                    <input type='file' className='absolute w-28 h-36 opacity-0 cursor-pointer' onChange={(e) => setImg2(e.target.files[0])} ></input>
                </div>
                <div className='mt-32 float-right'>
                    <button type="submit" className='bg-neutral-900 text-white font-semibold p-2 w-16 rounded'>ADD </button>
                </div>
            </div>

            

            
        </form>
    </div>
  )
}

export default PageContentServiceAddForm