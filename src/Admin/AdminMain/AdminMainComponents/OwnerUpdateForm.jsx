import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

function OwnerUpdateForm(props) {

    const { currentUser } = useContext(AuthContext);

    const [ownerImage, setOwnerImage] = useState(null);
    const [updateOwner, setUpdateOwner] = useState({
        ownerName: '',
        ownerType: '',
        editedByAdmin: '',
        ownerImage: ''
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        setUpdateOwner({
            ownerName: props.updateData.ownerName || '',
            ownerType: props.updateData.ownerType || '',
            editedByAdmin: currentUser.adminId || '',
            ownerImage: props.updateData.ownerImage || ''
        });
    }, [props.updateData, currentUser]);

    const updateOwnerDetails = (e) => {
        setUpdateOwner((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setOwnerImage(imageFile);
    };

    const handleUpdateOwner = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('ownerIMG', ownerImage);
            formData.append('ownerData', JSON.stringify(updateOwner));
            await axios.put(`https://test-repo-2xuo.onrender.com/api/adminBoard/main/owners/${props.updateData.ownerId}`, formData);
            window.location.reload(); // Reload the page after successful update
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (ownerImage) {
            setPreview(URL.createObjectURL(ownerImage));
        } else {
            setPreview(null);
        }

        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [ownerImage]);

    useEffect(() => {
        if (updateOwner.ownerImage) {
          const objectUrl = 'https://test-repo-2xuo.onrender.com/images/'+updateOwner.ownerImage;
          setPreview(objectUrl);
        }
      }, [updateOwner.ownerImage]);
  return (
        //update form
    <div className='' >
        <h3 className='text-center text-[25px] font-bold text-slate-700 mt-4'>Update Owner</h3>

        <div className='field mt-3'>
            <div className='w-28 h-36 bg-slate-400'>
                {preview && <img className='inset-0 w-full h-full  object-cover' src={preview} />}
            </div>

            <input type='file' className='absolute w-28 h-36 opacity-0 cursor-pointer' onChange={handleImageChange}></input>
        </div>

        <div className='field mt-4'>
            <label className='label'>Name :</label>
            {updateOwner.ownerName !== null && (
                <input className='ownerFormInput' type='text' name='ownerName' value={updateOwner.ownerName} onChange={updateOwnerDetails} />
            )}
        </div>

        <div className='field mt-3'>
            <label className='label'>Position :</label>
            {updateOwner.ownerType !== null && (
                <input className='ownerFormInput' type='text' name='ownerType' value={updateOwner.ownerType} onChange={updateOwnerDetails} />
            )}
        </div>

        <div className='mt-10 float-right mr-6'>
            <button className='bg-neutral-900 text-white font-semibold p-2 w-20 rounded'onClick={handleUpdateOwner} >UPDATE </button>
        </div>
    </div>
  )
}

export default OwnerUpdateForm