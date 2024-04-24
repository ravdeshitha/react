import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import EventAddForm from './EventAddForm';
import EventUpdateForm from './EventUpdateForm';


import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdTableChart } from "react-icons/md";

function EventDetails() {
    const [eventFormState, setEventFormState] = useState(true);
    const [updateData, setUpdateData] = useState();

    //change the main two forms(add new admin, update admin details)
    const AddFormState = () =>{
        setEventFormState(true);
        setUpdateData();
    }
    const updateFormState = (data) => {
        if (eventFormState) {
            setEventFormState(false);
        }
        setUpdateData(data);
    };



    //get the data for event table

    const [eventDetails, setEventDetails] =useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/event`, { withCredentials: true })
        .then(res=>{
            setEventDetails(res.data.result);
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (key) =>{
        console.log(key);
        axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/event/${key}`, { withCredentials: true })
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }
    
    return (
        <div className='w-full h-[90vh]'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Event Details</h2>
                <hr className='h-[2px] border-slate-300 mt-6'/>

            </div>

            <div className='flex w-[90%] m-auto justify-between pt-4'>

                <div className='w-[49%] box-shadow-2 rounded-lg overflow-hidden'>
                    <div className='h-9 bg-white pt-1 pl-2 flex justify-between'>
                        <div className='flex w-[200px]'>
                            <MdTableChart className='text-slate-700 text-[20px] m-1'/> Event List
                        </div>
                        <div>
                            <button className='mr-3 border-2 border-slate-600 text-slate-600 font-bold text-[12px] rounded p-[3px]'  onClick={AddFormState}>ADD NEW OWNER</button>
                        </div>
                    </div>

                    <div className='h-[100%] m-auto'  style={{ maxHeight: '66vh', overflowY: 'auto' }}>
                        
                        <table className='min-w-full divide-y divide-gray-200 w-full' >
                                
                            <thead className='sticky top-0'>
                                <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                                    <th className='w-[5%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>No.</th>
                                    <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Event Name</th>
                                    <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>

                                {eventDetails.map((row, index) =>(
                                    <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-9 cursor-pointer`}>
                                        <td className='pl-2'>{index+1}</td>
                                        <td>{row.eventName}</td>
                                        <td className='flex'> 
                                            <button onClick={() => updateFormState(row)} ><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800'/></button>
                                            <button onClick={() => handleDelete(row.eventId)}><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800'/></button>
                                        </td>
                                        
                                    </tr>
                                ))}
                            
                            </tbody>
                            
                        </table>
                    </div>

                </div>

                <div className='w-[49%] h-[70vh] box-shadow-1 rounded-lg bg-slate-200'>
                    {eventFormState? (
                        <div className='editing-section pt-1'>
                            <EventAddForm />
                        </div>
                        ):(
                        <div className='editing-section pt-1' style={{ minHeight: '550px'}}>
                            <EventUpdateForm updateData={updateData} />
                        </div>
                    )}
                    
                </div>
            </div>
            
        </div>
    )
}

export default EventDetails