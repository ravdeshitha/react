import { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import { ImCross } from "react-icons/im";
import PageContentServiceAddForm from './PageContentServiceAddForm';
import PageContentServiceUpdateForm from './PageContentServiceUpdateForm';
import PageContentSlideImageAddForm from './PageContentSlideImageAddForm';

function PageContentDetails() {
    const { currentUser } = useContext(AuthContext);

    const [slideFormState, setSlideFormState] = useState(true);
    const [serviceFormState, setServiceFormState] = useState('table');
    const [countdownFormState, setCountDownFormState] = useState(true);

    const [serviceData, setServiceData] = useState([]);
    const [slideData, setSLideData] = useState([]);

    const [countData, setCountData] = useState({
        countdownId: '',
        employees: '',
        projects: '',
        modifiedBy: ''
    })

    const [updateData, setUpdateData] = useState();

    const handleSlideFormState = () =>{
        setSlideFormState(false);
    }

    const handleServiceFormState = (type) =>{
        setServiceFormState(type);
        setUpdateData();
    }

    const handleServiceUpdateState = (data) =>{
        if(serviceFormState !== 'update'){
            setServiceFormState('update');
        }
        setUpdateData(data);
    }

    const handleCountChange = (e) =>{
        setCountData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    useEffect(() =>{
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/countdown`, { withCredentials: true })
        .then(res=>{
            setCountData({
                countdownId: res.data.result[0].countdownId,
                employees: res.data.result[0].employees,
                projects: res.data.result[0].projects,
                modifiedBy: currentUser.adminId
            });
        })
        .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/services`, { withCredentials: true })
        .then(res=>{
            setServiceData(res.data.result);
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/slideImage`, { withCredentials: true })
        .then(res=>{
            setSLideData(res.data.result);
        })
        .catch(err => console.log(err));
    }, []);

    const handleCountdownUpdate =async(e) =>{
        e.preventDefault();

        await axios.put(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/countdown`,countData, { withCredentials: true })
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleCross =() =>{
        setCountDownFormState(true);
        window.location.reload();
    }

    const handleServiceDelete = async(row) =>{

        await axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/services/${row.serviceId}`,{ withCredentials: true })
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleSlideDelete = async(row) =>{

        await axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/content/slideImage/${row.slideId}`,{ withCredentials: true })
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='w-full h-[90vh]'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Page Content Details</h2>
                <hr className='h-[2px] border-slate-300 mt-6'/>

            </div>

            
            <div className='flex w-[90%] m-auto justify-between pt-4'>
                
                {slideFormState? (
                    <div className='w-[38%] h-[55vh] box-shadow-1 bg-slate-100 rounded-lg overflow-hidden'>
                        
                        <div className='h-9 bg-white pt-1 pl-2 flex justify-between'>
                            <div className='flex w-[200px]'>
                                <MdTableChart className='text-slate-700 text-[20px] m-1'/> Slidesow Image List
                            </div>
                            <div>
                                <button className='mr-3 border-2 border-slate-600 text-slate-600 font-bold text-[12px] rounded p-[3px]'onClick={handleSlideFormState}>ADD NEW IMAGE</button>
                            </div>
                        </div>
                        

                        <div className='h-[80%] m-auto'  style={{ maxHeight: '1500px', overflowY: 'auto' }}>
                            
                            <table className='min-w-full divide-y divide-gray-200 w-full' >
                                    
                                <thead className='sticky top-0'>
                                    <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                                        <th className='w-[5%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>No.</th>
                                        <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>IMAGE</th>
                                        <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    
                                    {slideData.map((row, index) =>(
                                    <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-20 cursor-pointer`}>
                                        <td className='pl-2'>{index+1}</td>
                                        <td><img className='h-20' src={`${import.meta.env.VITE_LOCAL_IMG_PATH + row.imageUrl}`}/></td>
                                        <td className='h-20 flex justify-center items-center'>
                                            <button><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => handleSlideDelete(row)} /></button>
                                            
                                        </td>
                                    </tr>
                                    ))}
                                
                                </tbody>
                                
                            </table>
                        </div>
                        
                    </div>
                ):(
                    <div className='w-[38%] h-[55vh] box-shadow-1 bg-slate-100 rounded-lg overflow-hidden'>
                        <PageContentSlideImageAddForm setSlideFormState={setSlideFormState}/>
                    </div>
                )}
                
                
                {serviceFormState === 'table' ? (
                    <div className='w-[60%] h-[55vh] box-shadow-1 bg-slate-100 rounded-lg overflow-hidden'>
                    
                        <div className='h-9 bg-white pt-1 pl-2 flex justify-between'>
                            <div className='flex w-[200px]'>
                                <MdTableChart className='text-slate-700 text-[20px] m-1'/> Service List
                            </div>
                            <div>
                                <button className='mr-3 border-2 border-slate-600 text-slate-600 font-bold text-[12px] rounded p-[3px]'onClick={() => handleServiceFormState('add')}>ADD NEW SERVICE</button>
                            </div>
                        </div>
                        

                        <div className='h-[80%] m-auto'  style={{ maxHeight: '1500px', overflowY: 'auto' }}>
                            
                            <table className='min-w-full divide-y divide-gray-200 w-full' >
                                    
                                <thead className='sticky top-0'>
                                    <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                                        <th className='w-[5%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>No.</th>
                                        <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>SERVICE NAME</th>
                                        <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>

                                    {serviceData.map((row, index) =>(
                                    <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-9 cursor-pointer`}>
                                        <td className='pl-2'>{index+1}</td>
                                        <td>{row.serviceName}</td>
                                        <td className='flex justify-center'>
                                            <button ><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => handleServiceUpdateState(row)}/></button>
                                            <button><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' onClick={() => handleServiceDelete(row)} /></button>
                                            
                                        </td>
                                    </tr>
                                    ))}
                                
                                </tbody>
                                
                            </table>
                        </div>
                        
                    </div>
                ):(
                    serviceFormState === 'add'? (
                        <div className='w-[60%] h-[55vh] box-shadow-1 bg-slate-100 rounded-lg overflow-hidden'>
                            <PageContentServiceAddForm setServiceFormState={setServiceFormState}/>
                        </div>
                    ):(
                        <div className='w-[60%] h-[55vh] box-shadow-1 bg-slate-100 rounded-lg overflow-hidden'>
                            <PageContentServiceUpdateForm updateData = {updateData}  setServiceFormState={setServiceFormState}/>
                        </div>
                    )
                )}
                

                {/* Add and Update forms */}
                {/* <div className='w-[60%] h-[55vh] box-shadow-1 rounded-lg bg-slate-100'>
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


                </div> */}
            </div>

            <div className='flex w-[90%] h-[18vh] m-auto justify-between pt-4'>
                
                <div className='w-[100%] h-[100%] box-shadow-1 rounded-lg bg-slate-100 overflow-hidden'>
                    {countdownFormState ? (
                        <div className='w-full h-[100%] flex items-center relative' >
                            <div className='w-36 h-[100%] flex justify-center items-center'>
                                <h3 className='font-bold text-slate-700 p-1 text-[20px]'>COUNTDOWN</h3>
                            </div>

                            <div className='w-[1px] h-[75%] bg-slate-500 ml-2 mr-3'></div>

                            <div className='w-72 h-[100%] flex items-center gap-6'>
                                <h3 className='font-bold text-slate-900 text-[20px]'>Employees</h3>
                                <div className='w-24 h-12 bg-slate-400 rounded-lg flex justify-center items-center box-shadow-3'>
                                    <h3 className='font-bold text-slate-950 text-[20px]'>{countData.employees}</h3>
                                </div>
                            </div>

                            <div className='w-[1px] h-[75%] bg-slate-700 ml-2 mr-3'></div>

                            <div className='w-80 h-[100%] flex items-center gap-6 pl-5'>
                                <h3 className='font-bold text-slate-900 text-[20px]'>Community Project</h3>
                                <div className='w-24 h-12 bg-slate-400 rounded-lg flex justify-center items-center box-shadow-3'>
                                    <h3 className='font-bold text-slate-950 text-[20px]'>{countData.projects}</h3>
                                </div>
                            </div>

                            <div className='absolute bottom-2 right-2' onClick={(e) => setCountDownFormState(false)}>
                                <CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800'/>
                            </div>

                        </div>
                    ):(
                        <div className='w-full h-[100%]'>
                            <form className='w-full h-[100%]' onSubmit={handleCountdownUpdate}>
                                <div className='w-full h-[100%] flex items-center relative' >
                                    
                                    <div className="w-7 h-7 border-2 border-slate-700 rounded-lg absolute top-3 right-5 p-1 cursor-pointer" onClick={handleCross}>
                                        <ImCross />
                                    </div>

                                    <div className='w-36 h-[100%] flex justify-center items-center'>
                                        <h3 className='font-bold text-slate-700 p-1 text-[20px]'>COUNTDOWN</h3>
                                    </div>

                                    <div className='w-[1px] h-[75%] bg-slate-500 ml-2 mr-3'></div>

                                    <div className='w-72 mt-2 pl-10'>
                                        <label className='uppercase font-bold text-slate-900'>Employees :</label>
                                        <input className='adminFormInput' type='number' name='employees' value={countData.employees} onChange={handleCountChange}/>
                                    </div>

                                    <div className='w-[1px] h-[75%] bg-slate-700 ml-2 mr-3'></div>

                                    <div className='w-72 mt-2 pl-10'>
                                        <label className='uppercase font-bold text-slate-900'>Community Projects :</label>
                                        <input className='adminFormInput' type='number' name='projects' value={countData.projects} onChange={handleCountChange}/>
                                    </div>

                                    <div className='absolute bottom-2 right-5'>
                                        <button type="submit" className='bg-neutral-900 text-white font-semibold p-2 w-20 rounded'>UPDATE </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            
        </div>
    )
}

export default PageContentDetails