import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';

function EventAddForm() {
    const {currentUser} =useContext(AuthContext);

    const [coverImg,setCoverImg] = useState();
    const [logoImg,setLogoImg] = useState();
    const [img1,setImg1] = useState();
    const [img2,setImg2] = useState();
    const [newEvent, setNewEvent] = useState({
        eventName: '',
        adminId: currentUser.adminId
    });

    const [previews, setPreviews] = useState({
        coverImg: null,
        logoImg: null,
        img1: null,
        img2: null
    });
    
    const handleChange = (e) =>{
        setNewEvent((data) => ({...data, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append('eventIMG', coverImg);
            formData.append('eventIMG', logoImg);
            formData.append('eventIMG', img1);
            formData.append('eventIMG', img2);
            formData.append('eventData', JSON.stringify(newEvent));
            await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/event`, formData, { withCredentials: true })
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
        const pimage = [coverImg, logoImg, img1, img2];
        const simage = ['coverImg', 'logoImg', 'img1', 'img2'];
        
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
    }, [coverImg, logoImg, img1, img2]);

  
    return (
        <div className='w-full h-full'>
  
            <div className=''>
                <h2 className='text-center text-slate-700 font-bold text-[30px]'>Add New Event</h2>
            </div>

            <div className='field'>
                <label className='label'>Event Name :</label>
                <input className='adminFormInput' type='text' name='eventName' onChange={handleChange}/>
            </div>
          
            <div className='field'>
                <label className='label'>Cover Image :</label>
                <div className='w-[33vw] h-32 bg-slate-400/50'>
                    {previews.coverImg && <img className='inset-0 w-full h-full object-cover' src={previews.coverImg} />}
                </div>
                    
                <input className='absolute w-[33vw] h-32 mt-5 opacity-0 cursor-pointer' type='file' name='coverImg' onChange={(e) => setCoverImg(e.target.files[0])}/>
  
            </div>

            <div className='flex justify-between w-[90%] m-auto pt-2'>
                <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                    <label className='label'>Logo Image :</label>
                    <div className='w-32 h-36 bg-slate-400/50'>
                        {previews.logoImg && <img className='inset-0 w-full h-full object-cover' src={previews.logoImg} />}
                    </div>
        
                    <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='logoImg' onChange={(e) => setLogoImg(e.target.files[0])} />
        
                </div>

                <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                    <label className='label'>Image-01 :</label>
                    <div className='w-32 h-36 bg-slate-400/50'>
                        {previews.img1 && <img className='inset-0 w-full h-full object-cover' src={previews.img1} />}
                    </div>
        
                    <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='img1' onChange={(e) => setImg1(e.target.files[0])} />
        
                </div>

                <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                    <label className='label'>Image-02 :</label>
                    <div className='w-32 h-36 bg-slate-400/50'>
                        {previews.img2 && <img className='inset-0 w-full h-full object-cover' src={previews.img2} />}
                    </div>
        
                    <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='img2' onChange={(e) => setImg2(e.target.files[0])} />
        
                </div>

            </div>
  
            <div className='mt-4 float-right mr-6'>
            <button className='bg-neutral-900 text-white p-2 w-16 rounded' onClick={handleSubmit}>ADD </button>
            </div>
  
        </div>
      
    )
}

export default EventAddForm