import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import OwnerAddForm from './OwnerAddForm';
import OwnerUpdateForm from './OwnerUpdateForm';

function OnwersDetails() {

    const [formType, setFormType] = useState(true);
    const [updateData, setUpdateData] = useState();

    const handleAddOwnerbtn = () => {
        setFormType(true);
    };

    const handleUpdatebtn = (data) => {
        if (formType) {
            setFormType(false);
        }
        setUpdateData(data);
    };

    const [directors, setDirectors] = useState([]);
    const [founder, setFounder] = useState([]);
    const [ceo, setCeo] = useState([]);

    //get all owner details
    useEffect(() =>{
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/owners`, { withCredentials: true })
        .then(res=>{
            setFounder(res.data.result.filter(item => item.ownerType === 'founder' || item.ownerType === 'Founder'));
            setCeo(res.data.result.filter(item => item.ownerType === 'ceo' || item.ownerType === 'CEO'));
            setDirectors(res.data.result.filter(item => item.ownerType !== 'Founder' && item.ownerType !== 'CEO'));
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const handleDelete = async(data) =>{
        const ownerId = data.ownerId;
        const ownerImage = data.ownerImage;

        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/owners/${ownerId}`, {params: { ownerImage },  withCredentials: true});
            if (res.data.message === 'success') {
                console.log("Delete success");
                window.location.reload();
            } else {
                console.log("Delete unsuccessful");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }
    
    return (
        <div className='w-full h-[90vh]'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Owners Details</h2>
                <hr className='h-[2px] border-slate-300 mt-6'/>

            </div>

            {/* Founder and CEO details and edit function */}
            <div className='flex w-[90%] m-auto justify-between'>

                {/* Founder */}

                {founder.length > 0 &&(
                    
                    <div className='w-[49%] h-20 bg-slate-100 rounded-lg box-shadow-1 flex'>
                    
                        <div className='w-16 h-20 p-2 mr-2'>
                            <img src={import.meta.env.VITE_LOCAL_IMG_PATH +founder[0].ownerImage} className='inset-0 w-full h-full object-cover'/>
                        </div>
                        <div className='w-[77%] pt-1'>
                            <h3 className='text-slate-800 text-[20px] font-bold'>{founder[0].ownerName}</h3>
                            <p className='text-slate-500 font-semibold'>{founder[0].ownerType}</p>
                        </div>
                        <div className='pt-10'>
                            <button><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() =>handleUpdatebtn(founder[0])}/></button>
                        </div>

                    </div>
                )}
                

                {/* CEO */}

                {ceo.length > 0 &&(
                    <div className='w-[49%] h-20 bg-slate-100 rounded-lg box-shadow-1 flex'>
                        <div className='w-16 h-20 p-2 mr-2'>
                            <img src={import.meta.env.VITE_LOCAL_IMG_PATH +ceo[0].ownerImage} className='inset-0 w-full h-full object-cover'/>
                        </div>
                        <div className='w-[77%] pt-1'>
                            <h3 className='text-slate-800 text-[20px] font-bold'>{ceo[0].ownerName}</h3>
                            <p className='text-slate-500 font-semibold'>{ceo[0].ownerType}</p>
                        </div>
                        <div className='pt-10'>
                            <button><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() =>handleUpdatebtn(ceo[0])}/></button>
                        </div>

                    </div>
                )}
                
            </div>

            {/* Derector table and owner add and owner update forms */}
            <div className='flex w-[90%] m-auto justify-between pt-4'>

                {/* Derector table */}
                <div className='w-[49%] box-shadow-1'>
                    
                    <div className='h-9 bg-white pt-1 pl-2 flex justify-between'>
                        <div className='flex w-[200px]'>
                            <MdTableChart className='text-slate-700 text-[20px] m-1'/> Derector List
                        </div>
                        <div>
                            <button className='mr-3 border-2 border-slate-600 text-slate-600 font-bold text-[12px] rounded p-[3px]' onClick={handleAddOwnerbtn}>ADD NEW OWNER</button>
                        </div>
                    </div>
                    

                    <div className='h-[80%] m-auto'  style={{ maxHeight: '1500px', overflowY: 'auto' }}>
                        
                        <table className='min-w-full divide-y divide-gray-200 w-full' >
                                
                            <thead className='sticky top-0'>
                                <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                                    <th className='w-[5%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>No.</th>
                                    <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Name</th>
                                    <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Position</th>
                                    <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>

                                {directors.map((row, index) =>(
                                <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-9 cursor-pointer`}>
                                    <td className='pl-2'>{index+1}</td>
                                    <td>{row.ownerName}</td>
                                    <td>{row.ownerType}</td>
                                    <td className='flex'>
                                        <button ><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => handleUpdatebtn(row)}/></button>
                                        <button><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => handleDelete(row)} /></button>
                                        
                                    </td>
                                </tr>
                                ))}
                            
                            </tbody>
                            
                        </table>
                    </div>
                    
                </div>

                {/* Add and Update forms */}
                <div className='w-[49%] h-[62vh] box-shadow-1 rounded-lg bg-slate-100'>
                    {formType ? (
                        //add form
                        <div className='addForm w-full' >
                            <OwnerAddForm />
                        </div>
                    ) : (

                        //update form
                        <div className='updateForm w-full' >
                            <OwnerUpdateForm updateData={updateData}/>
                        </div>
                    )}


                </div>
            </div>

            
        </div>
    )
}

export default OnwersDetails