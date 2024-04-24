import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ProfileImage from '../../Asets/profile.png';
import axios from "axios";

function OwnerAddForm() {
    const { currentUser } = useContext(AuthContext);

    const [ownerImage, setOwnerImage] = useState(null);
    const [addOwner, setAddOwner] = useState({
        ownerName: '',
        ownerType: '',
        editedByAdmin: currentUser.adminId,
    });
    const [preview, setPreview] = useState(null);

    const addOwnerDetails = (e) => {
        setAddOwner((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setOwnerImage(imageFile);
    };

    const handleAddOwner = async (e) =>{
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append('ownerIMG', ownerImage);
            formData.append('ownerData', JSON.stringify(addOwner));
            await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/owners`, formData, { withCredentials: true })
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
        setPreview(ProfileImage);
    }, []);

  return (
    
    <div className='' >
        <h3 className='text-center text-[25px] font-bold text-slate-700 mt-4'>Add New Owner</h3>

        <div className='field mt-3'>
            <div className='w-28 h-36 bg-slate-400'>
                {preview && <img className='inset-0 w-full h-full  object-cover' src={preview} />}
            </div>

            <input type='file' className='absolute w-28 h-36 opacity-0 cursor-pointer' onChange={handleImageChange} ></input>
        </div>

        <div className='field mt-4'>
            <label className='label'>Name :</label>
            <input className='ownerFormInput' type='text' name='ownerName' onChange={addOwnerDetails} />
        </div>

        <div className='field mt-3'>
            <label className='label'>Position :</label>
            <input className='ownerFormInput' type='text' name='ownerType' onChange={addOwnerDetails} />
        </div>

        <div className='mt-10 float-right mr-6'>
            <button className='bg-neutral-900 text-white font-semibold p-2 w-16 rounded' onClick={handleAddOwner}>ADD </button>
        </div>
    </div>
  )
}

export default OwnerAddForm