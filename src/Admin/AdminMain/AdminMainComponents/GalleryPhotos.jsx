import React, { useEffect, useState } from 'react';
import AlbumAddForm from './AlbumAddForm';
import GallPhotoAddForm from './GalleryPhotoAddForm';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";

function GalleryPhotos() {
    const [albums, setAlbums] = useState([]);
    const [company1, setCompany1] = useState('all');
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [imageAlbum,setImageAlbum] = useState('all');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album`, { withCredentials: true })
        .then(res => {
            setAlbums(res.data.result.filter(item => item.albumType === 'Photo' || item.albumType === 'photo'));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/photoAlbum`, { withCredentials: true })
        .then(res => {
            setPhotos(res.data.result);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const deletePhoto = (imgId, imgURL) =>{
        axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/poster/${imgId}/${imgURL}`,{ withCredentials: true })
        .then(res => {
        console.log('success');
        window.location.reload();
        })
        .catch(err => {
        console.log(err);
        });

    };

    const deleteAlbum = (albumId) =>{
        axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album/${albumId}`,{ withCredentials: true })
        .then(res => {
        console.log('success');
        window.location.reload();
        })
        .catch(err => {
        console.log(err);
        });

    }

    return (
        <div className='w-full h-[90vh]'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Gallery</h2>
                <hr className='h-[2px] border-slate-300 mt-6'/>
    
            </div>
            <div  className='w-[96%] m-auto'>
                <AlbumAddForm />

                {isAddPhoto ? (
                    <div>
                        <GallPhotoAddForm setIsAddPhoto={setIsAddPhoto}/>
                    </div>
                ):(
                    <div className='flex gap-5'>

                        <div className='w-[40%] h-[57vh] bg-slate-200 mt-4 box-shadow-1 rounded-lg overflow-hidden'>

                            <div className='w-full h-[8vh] bg-slate-600 flex items-center justify-between pr-4'>

                                <h3 className='text-[20px] text-slate-200 pl-4 font-bold'>Albums</h3>

                                <select className='galInput galselection w-[60%]' onChange={(e) => setCompany1(e.target.value)}>
                                <option value='all'>Select the Company (All)</option>
                                <option value='main'>Main Web</option>
                                <option value='bakery'>Wasana Bakery</option>
                                <option value='gimanhala'>Wasana Gimanhala</option>
                                <option value='reception'>Reception Hall</option>
                                </select>

                            </div>

                            <div className='h-[52vh] w-full overflow-y-auto'>

                                {albums.map((album, index) => {
                                if (company1 === 'all' || company1 === album.category) {
                                    return (
                                    <div className='flex justify-between mx-2 px-2 py-1 border-b-2 border-slate-400/50' key={index} onClick={() => setImageAlbum(album.albumId)}>
                                        <h3 className='pl-4 capitalize font-semibold'>{album.albumName}</h3>
                                        <MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => deleteAlbum(album.albumId)}/>
                                    </div>
                                    );
                                }
                                return null; // Return null if condition is not met
                                })}

                            </div>

                        </div>


                        <div className='w-[60%] h-[57vh] bg-slate-200 mt-4 box-shadow-1 rounded-lg overflow-hidden'>

                            <div className='w-full h-[8vh] bg-slate-600 flex items-center justify-between pr-4'>

                                <h3 className='text-[20px] text-slate-200 pl-4 font-bold'>Photos</h3>

                                <button onClick={() => setIsAddPhoto(true)} className='border-2 border-slate-300 text-slate-200 font-semibold p-1 rounded-md'>Add New Photos</button>

                                {/* <select className='galInput galselection w-[50%]' onChange={(e) => setCompany2(e.target.value)}>
                                <option value='all'>Select the Company (All)</option>
                                <option value='main'>Main Web</option>
                                <option value='bakery'>Wasana Bakery</option>
                                <option value='gimanhala'>Wasana Gimanhala</option>
                                <option value='reception'>Reception Hall</option>
                                </select> */}

                            </div>

                            <div className='h-[48vh] w-full overflow-y-auto pt-2 px-2'>
                                <div className="p-3">
                                    <div className="columns-5 gap-3 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
                                        {photos.map((item,index) =>{
                                            if(company1 === 'all' || company1 === item.category) {
                                                return (
                                                    <div key={index} className='relative mb-3'>
                                                        <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.imgURL} />
                                                        <div className='bg-red-500 w-5 h-5 rounded-[50%] p-1 absolute top-0 right-0'>
                                                            <ImCross className='text-white text-[12px]' onClick={() => deletePhoto(item.imgId, item.imgURL)} />
                                                        </div>
                                                    </div>
                                                );
                                                
                                            }
                                            return null; // Return null if condition is not met
                                        })}
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                )};
            </div>
        </div>
      )
}

export default GalleryPhotos

