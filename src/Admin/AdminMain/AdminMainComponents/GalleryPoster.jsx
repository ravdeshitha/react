import React, { useEffect, useState } from 'react';
import AlbumAddForm from './AlbumAddForm';
import GalleryAddPoster from './GalleryAddPoster';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

function GalleryPoster() {
  const [albums, setAlbums] = useState([]);
  const [company1, setCompany1] = useState('all');
  const [company2, setCompany2] = useState('all');
  const [isAddPoster, setIsAddPoster] = useState();
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album`, { withCredentials: true })
      .then(res => {
        setAlbums(res.data.result.filter(item => item.albumType === 'Event' || item.albumType === 'event'));
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/posterAlbum`, { withCredentials: true })
      .then(res => {
        setPosters(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deletePoster = (imgId, imgURL) =>{
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
        <hr className='h-[2px] border-slate-300 mt-6' />
      </div>

      <div className='w-[96%] m-auto'>
        
        <AlbumAddForm />
        
        {isAddPoster ? (
          <div>
            <GalleryAddPoster setIsAddPoster={setIsAddPoster}/>
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
                      <div className='flex justify-between mx-2 px-2 py-1 border-b-2 border-slate-400/50' key={index}>
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

                <h3 className='text-[20px] text-slate-200 pl-4 font-bold'>Poster</h3>

                <button onClick={() => setIsAddPoster(true)} className='border-2 border-slate-300 text-slate-200 font-semibold p-1 rounded-md'>Add New Poster</button>

                <select className='galInput galselection w-[50%]' onChange={(e) => setCompany2(e.target.value)}>
                  <option value='all'>Select the Company (All)</option>
                  <option value='main'>Main Web</option>
                  <option value='bakery'>Wasana Bakery</option>
                  <option value='gimanhala'>Wasana Gimanhala</option>
                  <option value='reception'>Reception Hall</option>
                </select>

              </div>

              <div className='h-[48vh] w-full overflow-y-auto mt-1'>

                {posters.map((item, index) => {
                  if (company2 === 'all' || company2 === item.category) {
                    return (
                      <div className='flex justify-between mx-2 px-1 py-1 border-b-2 border-slate-400/50' key={index}>
                        <div className='w-36'>
                          <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.imgURL} />
                        </div>
                        <MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => deletePoster(item.imgId, item.imgURL)}/>
                      </div>
                    );
                  }
                  return null; // Return null if condition is not met
                })}

              </div>

            </div>
            
          </div>
        )};
        

        
      </div>
    </div>
  );
}

export default GalleryPoster;
