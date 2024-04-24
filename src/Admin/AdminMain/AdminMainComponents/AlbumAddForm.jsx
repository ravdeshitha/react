import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function AlbumAddForm() {
    const {currentUser} = useContext(AuthContext);

  // State variable to store form data
  const [albumData, setAlbumData] = useState({
    albumName: '',
    category: '',
    albumType: '',
    adminId: currentUser.adminId
  });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/album`, albumData, {withCredentials: true});
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setAlbumData({ ...albumData, [e.target.name]: e.target.value });
  };

  return (
    <div className='w-full h-28 bg-slate-200 rounded-lg pl-3 pr-3 pt-1 box-shadow-1'>
      <h3 className='text-[22px] font-bold text-slate-800'>Add New Album</h3>

      <form onSubmit={handleSubmit}>
        <div className='w-full flex gap-4'>
          <div className='galField'>
            <label className='galLabel'>Album Name</label>
            <input
              className='galInput'
              type='text'
              name='albumName'
              value={albumData.albumName}
              onChange={handleChange}
            />
          </div>

          <div className='galField'>
            <label className='galLabel'>Category(Company)</label>
            <select
              className='galInput'
              name='category'
              value={albumData.category}
              onChange={handleChange}
            >
              <option value=''>Select Category</option>
              <option value='main'>Main Web</option>
              <option value='bakery'>Wasana Bakery</option>
              <option value='gimanhala'>Wasana Gimanhala</option>
              <option value='reception'>Reception Hall</option>
            </select>
          </div>

          <div className='galField'>
            <label className='galLabel'>Album Type</label>
            <select
              className='galInput'
              name='albumType'
              value={albumData.albumType}
              onChange={handleChange}
            >
              <option value=''>Select Album Type</option>
              <option value='Event'>Event</option>
              <option value='Photo'>Photo</option>
            </select>
          </div>

          <div className='galField w-20'>
            <button className='w-20 h-8 bg-slate-400 mt-5 rounded-md font-bold' type='submit'>
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlbumAddForm;
