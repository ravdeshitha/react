import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileImage from '../../Asets/profile.png';


function AdminAddForm() {

  const [file, setFile] = useState();//addi image
  const [previews, setPreviews] = useState();//set preview image

  const [adminData, setAdminData] = useState({
    fullName : '',
    phoneNumber : '',
    password : '',
    confirmPassword :'',
    adminId : '',
    email : ''
  });

  const handleAddPhoto = (e) =>{
    setFile(e.target.files[0]);
  }

  const handleChange = (e) =>{
    setAdminData((data)=> ({...data, [e.target.name] : e.target.value}));
  }

  const handleAdd = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('adminIMG', file);
    formData.append('adminData', JSON.stringify(adminData));
    await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/adminUsers`,formData, { withCredentials: true })
    .then(res =>{
        if(res.data.message === 'success'){
            console.log('admin add success');
            window.location.reload();
        }
        else{
            console.log('admin add unsuccess');
        }
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (!file) {
      setPreviews(null); // Clear the previews if no files are selected
      return;
    }
  
    const objectUrl = URL.createObjectURL(file); // Create object URL for the first file
    setPreviews(objectUrl);
  
    // Free memory when component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  useEffect(() => {
    
    setPreviews(ProfileImage);
    
  }, []);


  return (
    <div className='w-full bg-slate-500 h-full'>

        <div className=''>
          <h2 className='text-center text-slate-300 font-bold text-[30px]'>Add New Admin</h2>
        </div>
        <div className='field'>
            <div className='w-24 h-32 bg-white'>
            {previews && <img className='inset-0 w-full h-full object-cover' src={previews} />} {/* preview of the uploaded image */}
            </div>

            <input className='absolute w-24 h-32 opacity-0 cursor-pointer' type='file' name='photo' 
            onChange={handleAddPhoto}
            />

        </div>

        <div className='field'>
            <label className='label'>Name :</label>
            <input className='adminFormInput' type='text' name='fullName' value={adminData.fullName} onChange={handleChange}/>
        </div>

        <div className='field'>
            <label className='label'>Email :</label>
            <input className='adminFormInput' type='text' name='email'  value={adminData.email} onChange={handleChange}/>
        </div>

        <div className='flex'>
                
            <div className='field2'>
                <label className='label'>Admin ID :</label>
                <input className='adminFormInput' type='text' name='adminId'  value={adminData.adminId} onChange={handleChange}/>
            </div>

            <div className='field2'>
                <label className='label'>Phone Number :</label>
                <input className='adminFormInput' type='text' name='phoneNumber'  value={adminData.phoneNumber} onChange={handleChange}/>
            </div>`
        </div>
              
        <div className='field'>
            <label className='label'>Password :</label>
            <input className='adminFormInput' type='text' name='password'  value={adminData.password} onChange={handleChange}/>
        </div>

        <div className='field'>
            <label className='label'>Confirm Password :</label>
            <input className='adminFormInput' type='text' name='confirmPassword'  value={adminData.confirmPassword} onChange={handleChange}/>
        </div>

        <div className='mt-4 float-right mr-6'>
            <button className='bg-neutral-900 text-white p-2 w-16 rounded' onClick={handleAdd}>ADD </button>
        </div>

    </div>
    
  )
}

export default AdminAddForm