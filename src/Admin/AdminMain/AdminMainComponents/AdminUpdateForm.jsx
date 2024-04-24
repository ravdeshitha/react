import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../../Asets/profile.png';

function AdminUpdateForm(props) {
    
    const [files, setFiles] = useState();
    const [previews, setPreviews] = useState();

    const [previousDetails, setPreviousDetails] = useState({
      userId: '',
      adminId: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      photo: ''
      
    });

    useEffect(() => {
      setPreviousDetails({
        userId: props.updateData.row.userId,
        adminId: props.updateData.row.adminId,
        fullName: props.updateData.row.fullName,
        phoneNumber: props.updateData.row.phoneNumber,
        email: props.updateData.row.email,
        photo: props.updateData.row.photo
      });
    }, [props.updateData]);

    const handleUpdatePhoto = (e) =>{
      setFiles(e.target.files[0]);
    }

    const handleUpdate = (e) =>{
      setPreviousDetails((data)=> ({...data, [e.target.name] : e.target.value}));
    }

    const userUpdate = async(e) =>{
      e.preventDefault();

      const formData = new FormData();
      formData.append('adminIMG', files);
      formData.append('updateAdminData', JSON.stringify(previousDetails));
      await axios.put(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/adminUsers/${previousDetails.userId}`,formData, { withCredentials: true })
      .then(res =>{
          if(res.data.message === 'success'){
              console.log('admin add success');
          }
          else{
              console.log('admin add unsuccess');
              window.location.reload();
          }
      })
      .catch(err => console.log(err));
    }

    
  
    useEffect(() => {
      if (!files) {
        setPreviews(null); // Clear the previews if no files are selected
        return;
      }
    
      const objectUrl = URL.createObjectURL(files); // Create object URL for the first file
      setPreviews(objectUrl);
    
      // Free memory when component unmounts
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }, [files]);
  
    // Preview of existing image
    useEffect(() => {
      if (previousDetails.photo) {
        const objectUrl = import.meta.env.VITE_LOCAL_IMG_PATH + previousDetails.photo;
        setPreviews(objectUrl);
      }
    }, [previousDetails.photo]);
  
  
    return (
      <div className='w-full bg-slate-500 h-full'>
  
          <div className=''>
            <h2 className='text-center text-slate-300 font-bold text-[30px]'>Update Details</h2>
          </div>

          <div className='field'>
            <div className='w-24 h-32 bg-white'>
              {previews && <img className='inset-0 w-full h-full object-cover' src={previews} />} {/* preview of the uploaded image */}
            </div>
  
              <input className='absolute w-24 h-32 opacity-0 cursor-pointer' type='file' name='photo' 
              onChange={handleUpdatePhoto}
              />
  
          </div>
  
          <div className='field'>
              <label className='label'>Name :</label>
              <input className='adminFormInput' type='text' name='fullName' value={previousDetails.fullName} onChange={handleUpdate}/>
          </div>
  
          <div className='field'>
              <label className='label'>Email :</label>
              <input className='adminFormInput' type='text' name='email' value={previousDetails.email} onChange={handleUpdate}/>
          </div>
  
          <div className='flex'>
                  
              <div className='field2'>
                  <label className='label'>Admin ID :</label>
                  <input className='adminFormInput' type='text' name='adminId' value={previousDetails.adminId} onChange={handleUpdate} />
              </div>
  
              <div className='field2'>
                  <label className='label'>Phone Number :</label>
                  <input className='adminFormInput' type='text' name='phoneNumber' value={previousDetails.phoneNumber} onChange={handleUpdate} />
              </div>`
          </div>
                
          <div className='field'>
              <label className='label'>Password :</label>
              <input className='adminFormInput' type='text' name='password' onChange={handleUpdate} />
          </div>
  
          <div className='field'>
              <label className='label'>Confirm Password :</label>
              <input className='adminFormInput' type='text' name='confirmPassword' onChange={handleUpdate} />
          </div>
  
          <div className='mt-4 float-right mr-6'>
              <button className='bg-neutral-900 text-white p-2 w-20 rounded' onClick={userUpdate}>UPDATE </button>
          </div>
  
      </div>
      
    )
}

export default AdminUpdateForm