import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function EventUpdateForm(props) {
    const {currentUser} =useContext(AuthContext);

    const [coverImg,setCoverImg] = useState(null);
    const [logoImg,setLogoImg] = useState(null);
    const [img1,setImg1] = useState(null);
    const [img2,setImg2] = useState(null);
    const [updateEvent, setUpdateEvent] = useState({
        eventId:'',
        eventName: '',
        adminId: ''
    });

    const [previews, setPreviews] = useState({
        coverImg: null,
        logoImg: null,
        img1: null,
        img2: null
    });

    const [imageNumber, setImageNumber] = useState([]);
    // 
  
    useEffect(() => {
        setUpdateEvent({
            eventId: props.updateData.eventId,
            eventName: props.updateData.eventName,
            adminId: currentUser.adminId
        })
        setCoverImg(props.updateData.coverImg);
        setLogoImg(props.updateData.logoImg);
        setImg1(props.updateData.img1);
        setImg2(props.updateData.img2);
    }, [props.updateData, currentUser]);
      
    const handleChange = (e) =>{
        setUpdateEvent((data) => ({...data, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append('eventIMG', coverImg);
            formData.append('eventIMG', logoImg);
            formData.append('eventIMG', img1);
            formData.append('eventIMG', img2);
            formData.append('eventData', JSON.stringify(updateEvent));
            imageNumber.forEach((number) => {
                formData.append('imageNumber', number);
            });
            await axios.put(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/event`, formData,{withCredentials: true})
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
                updatedPreviews[prev] = '';
                continue;
            }

            if (typeof image === 'string') {
                updatedPreviews[prev] = import.meta.env.VITE_LOCAL_IMG_PATH + image;
            } else {
                const imageUrl = URL.createObjectURL(image); // Corrected this line
                updatedPreviews[prev] = imageUrl;

                cleanupFunctions.push(() => {
                    URL.revokeObjectURL(imageUrl);
                });
            }
        }

        setPreviews(updatedPreviews);

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [coverImg, logoImg, img1, img2]);
    return (
        <div className='w-full h-full'>
  
          <div className=''>
            <h2 className='text-center text-slate-700 font-bold text-[30px]'>Update Event</h2>
          </div>

          <div className='field'>
              <label className='label'>Event Name :</label>
              <input className='adminFormInput' type='text' name='eventName' value={updateEvent.eventName} onChange={handleChange}/>
          </div>
          
          <div className='field'>
            <label className='label'>Cover Image :</label>
            <div className='w-[33vw] h-32 bg-slate-400/50'>
                {previews.coverImg && <img className='inset-0 w-full h-full object-cover' src={previews.coverImg} />}
            </div>
  
            <input className='absolute w-[33vw] h-32 mt-5 opacity-0 cursor-pointer' type='file' name='coverImg' onChange={(e) => {setCoverImg(e.target.files[0]); setImageNumber(prev => [...prev, 0]);}}/>
  
          </div>

          <div className='flex justify-between w-[90%] m-auto pt-2'>
            <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                <label className='label'>Logo Image :</label>
                <div className='w-32 h-36 bg-slate-400/50'>
                    {previews.logoImg && <img className='inset-0 w-full h-full object-cover' src={previews.logoImg} />}
                </div>
    
                <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='logoImg' onChange={(e) => {setLogoImg(e.target.files[0]); setImageNumber(prev => [...prev, 1]);}} />
    
            </div>

            <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                <label className='label'>Image-01 :</label>
                <div className='w-32 h-36 bg-slate-400/50'>
                    {previews.img1 && <img className='inset-0 w-full h-full object-cover' src={previews.img1} />}
                </div>
    
                <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='img1' onChange={(e) => {setImg1(e.target.files[0]); setImageNumber(prev => [...prev, 2]);}} />
    
            </div>

            <div className='flex flex-col text-sm text-gray-800 uppercase tracking-wider'>
                <label className='label'>Image-02 :</label>
                <div className='w-32 h-36 bg-slate-400/50'>
                    {previews.img2 && <img className='inset-0 w-full h-full object-cover' src={previews.img2} />}
                </div>
    
                <input className='absolute w-32 h-36 mt-5 opacity-0 cursor-pointer' type='file' name='img2' onChange={(e) => {setImg2(e.target.files[0]); setImageNumber(prev => [...prev, 3]);}} />
    
            </div>

          </div>
  
          <div className='mt-4 float-right mr-6'>
              <button className='bg-neutral-900 text-white p-2 w-16 rounded' onClick={handleSubmit}>Update </button>
          </div>
  
      </div>
        
      )
}

export default EventUpdateForm