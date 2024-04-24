import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { AuthContext } from '../../../context/AuthContext';
import { ImCross } from "react-icons/im";

function GalleryAddPoster({ setIsAddPoster }) {
    const { currentUser } = useContext(AuthContext);

    const [albums, setAlbums] = useState([]);
    const [posterData, setPosterData] = useState({
        albumId: '',
        adminId: currentUser.adminId
    });
    const [posterImage, setPosterImage] = useState();
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setPosterData({ ...posterData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setPosterImage(e.target.files[0]);
    };

    const handleAddPoster = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('posterIMG', posterImage);
            formData.append('posterData', JSON.stringify(posterData));
            await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/poster`, formData, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    setPreview(null);
                    setPosterImage(null);
                    setPosterData({
                        ...posterData,
                        albumId: ''
                    });
                    e.target.reset(); // Reset the form after successful submission
                })
                .catch(err => {
                    console.log(err);
                })

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album`,{withCredentials:true})
            .then(res => {
                setAlbums(res.data.result.filter(item => item.albumType === 'Event' || item.albumType === 'event'));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        if (posterImage) {
            setPreview(URL.createObjectURL(posterImage));
        } else {
            setPreview(null);
        }
    }, [posterImage]);

    const handleCross = () => {
        setIsAddPoster(false);
        window.location.reload();
    }

    return (
        <div className='w-full h-[56vh] bg-slate-200 rounded-lg mt-5 box-shadow-1 overflow-hidden'>
            <form onSubmit={handleAddPoster}>
                <div className='w-full h-[46vh] pl-5 pt-2 pr-4'>
                    <div className='flex justify-between'>
                        <h3 className='text-[27px] font-bold text-slate-800 mb-3'>Upload Main Poster</h3>
                        <ImCross className='border-2 border-slate-800 p-1 rounded-md text-[30px]' onClick={handleCross} />
                    </div>
                    <div className='flex w-full gap-7'>
                        <div className='relative w-[28%] h-[35vh] rounded-lg border-dotted border-gray-700 border-[3px] flex flex-col justify-center items-center'>
                            <input type='file' className='absolute w-full h-full opacity-0' onChange={handleImageChange} required />
                            <h3 className='text-[20px]'>Click & Add</h3>
                            <FaSquarePlus className='text-[40px]' />
                        </div>

                        <div className='w-[69%] h-[35vh] bg-slate-400 flex justify-center items-center'>
                            {preview && <img className='inset-0 w-full h-full  object-cover' src={preview} />}
                            {!preview && <h3>1200 X 400</h3>}
                        </div>
                    </div>
                </div>

                <div className='w-full h-[10vh] bg-slate-700 flex items-start justify-end'>
                    <div className='w-[60%] flex gap-5 mr-10 items-center'>
                        <h3 className='w-[80%] mt-4 text-yellow-600 font-bold'>Before Add Poster Select The Album</h3>
                        <div className='galField mt-0'>
                            <label className='galLabel text-slate-100'>Select Album</label>
                            <select className='galInput w-80 bg-slate-200/70 galselection' name='albumId' value={posterData.albumId} onChange={handleChange} required>

                                <option value=''>Select Album</option>

                                {albums.map((album, index) => (
                                    <option value={album.albumId} key={index}>{album.albumName}</option>
                                ))}

                            </select>

                        </div>

                        <div className='galField w-20 mt-0'>
                            <button className='w-20 h-8 bg-slate-200 mt-5 rounded-md font-bold' type='submit'>
                                ADD
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default GalleryAddPoster
