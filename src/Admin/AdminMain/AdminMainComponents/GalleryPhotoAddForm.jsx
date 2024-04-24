import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { AuthContext } from '../../../context/AuthContext';

function GalleryPhotoAddForm({ setIsAddPhoto}) {
    const { currentUser } = useContext(AuthContext);


    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [preview, setPreview] = useState([]);
    const [photoData, setPhotoData] = useState({
        albumId: '',
        adminId: currentUser.adminId
    })

    const handleImageChange = (e) => {
        setPhotos(Array.from(e.target.files)); // Convert FileList to array
    };

    const handleCancel = () => {
        setPhotos([]);
        setPreview([]);
    };

    const handleChange = (e) =>{
        setPhotoData({ ...photoData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(photoData)

        
        const formData = new FormData();
        photos.forEach(photo => {
            formData.append('glIMG', photo);
        });
        formData.append('photoData', JSON.stringify(photoData));
            
        await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/photos`, formData, {withCredentials: true})
            .then(res =>{
                window.location.reload();
                console.log("success");
            })
            .catch(err =>{
                console.log(err);
            })
    }
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album`, { withCredentials: true })
        .then(res => {
            setAlbums(res.data.result.filter(item => item.albumType === 'Photo' || item.albumType === 'photo'));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    useEffect(() => {
        const urls = photos.map(photo => URL.createObjectURL(photo)); // Create URL for each photo
        setPreview(urls);

        // Clean up to revoke ObjectURLs
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photos]);

    return (
        <div>
            <form className='flex gap-5' onSubmit={handleSubmit}>
                <div className='w-[30%] h-[57vh] bg-slate-200 mt-4 box-shadow-1 rounded-lg overflow-hidden p-5'>
                    <h3 className='text-center text-[28px] font-bold mb-4 text-slate-800'>Upload Images</h3>

                    <div className='relative w-full h-[37vh] rounded-lg border-dotted border-gray-700 border-[3px] flex flex-col justify-center items-center'>
                        <input type='file' className='cursor-pointer absolute w-full h-full opacity-0' onChange={handleImageChange} multiple required />
                        <h3 className='text-[20px]'>Click & Add</h3>
                        <FaSquarePlus className='text-[40px]' />
                    </div>

                    <div className='w-full h-10 mt-2 bg-red-600 rounded-lg text-white font-bold text-center text-[18px] p-1'  onClick={handleCancel}>Calncel Upload</div>
                </div>
                <div className='w-[70%] h-[57vh] bg-slate-200 mt-4 box-shadow-1 rounded-lg overflow-hidden relative'>
                    <div className='w-full h-[8vh] bg-slate-600 flex items-center justify-between pr-3'>
                        <h3 className='text-[20px] text-slate-200 pl-4 font-bold'>Photos</h3>

                        <button onClick={() => setIsAddPhoto(false)} className='border-2 border-slate-300 text-slate-200 font-semibold p-1 rounded-md'>Photo View</button>

                        <div className='w-[50%] flex gap-4'>
                            <select className='galInput galselection w-[80%]' name='albumId' onChange={handleChange} required>
                                <option value=''>Select Album</option>
                                {albums.map((item, index) => (
                                    <option key={index} value={item.albumId}>{item.albumName}</option>
                                ))}
                            </select>
                            <button type='submit' className='w-20 h-8 bg-slate-200 rounded-md font-bold'>ADD</button>
                        </div>
                    </div>
                    <div className='h-[48vh] w-full overflow-y-auto pt-2 px-2'>
                        <div className="p-3 grid grid-cols-5 gap-3 lg:gap-3 lg:grid-cols-5 md:grid-cols-5 xl:grid-cols-5 sm:grid-cols-5">
                            {preview.map((url, index) => (
                                <div key={index} className='mb-3'>
                                    <img src={url} alt={`Image ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default GalleryPhotoAddForm;
