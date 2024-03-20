import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminAddForm from './AdminAddForm'; //for Add new Admin for the system
import AdminUpdateForm from './AdminUpdateForm';// for Update existing admin details

//icons 
import { MdTableChart } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function AdminDetails() {


  const [adminFormState, setAdminFormState] = useState(true);
  const [updateData, setUpdateData] = useState();

  //change the main two forms(add new admin, update admin details)
  const AddFormState = () =>{
    setAdminFormState(true);
  }
  const updateFormState = (data) => {
    if (adminFormState) {
      setAdminFormState(false);
    }
    setUpdateData(data);
  };

  const deleteAdmin = (data) => {
    axios.delete(`https://test-repo-2xuo.onrender.com/api/adminBoard/main/adminUsers/${data.row.adminId}`,{ data: { photo: data.row.photo }})
    .then(res =>{
      console.log(res);
      window.location.reload();
    })
    .catch(err=>{
      console.log(err);
    });
  };

  //get the data for admin user table

  const [adminUsers, setAdminUsers] =useState([]);

  useEffect(() => {
    axios.get("https://test-repo-2xuo.onrender.com/api/adminBoard/main/adminUsers")
    .then(res=>{
      setAdminUsers(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className='w-full h-[90vh]'>
      <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
        <h2 className='ml-10 font-semibold text-slate-600'>Admin Details</h2>
        <hr className='h-[2px] border-slate-300 mt-6'/>

      </div>

      <div className='admindetails w-full flex'>

        <div className='table-section pt-5  w-[60%]' style={{ minHeight: '550px'}}>
          <div className='h-9 bg-white w-[90%] pt-1 pl-2 ml-[5%] mr-[5%] flex justify-between'>
            <div className='flex w-[200px]'>
              <MdTableChart className='text-slate-700 text-[20px] m-1'/> Admin List
            </div>
            <div>
              <button className='mr-3 border-2 border-slate-600 text-slate-600 font-bold text-[12px] rounded p-[3px]' onClick={AddFormState}>ADD NEW ADMIN</button>
            </div>
          </div>

          <div className='w-[90%] h-[80%] m-auto'  style={{ maxHeight: '600px', overflowY: 'auto' }}>
            
            
            <table className='min-w-full divide-y divide-gray-200 w-full' >
              
              <thead className='sticky top-0'>
                <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                  <th className='w-[10%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>Admin ID</th>
                  <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Name</th>
                  <th className='w-[15%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Phone</th>
                  <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Email</th>
                  <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>

                {adminUsers.map((row, index) =>(
                  <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-9 cursor-pointer`} >
                    <td className='pl-2'>{row.adminId}</td>
                    <td>{row.fullName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.email}</td>
                    <td className='pl-5 flex'>
                    <Link to='' onClick={() => updateFormState({row})}><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800'/></Link>
                    <Link to='' onClick={() => deleteAdmin({row})}><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' /></Link>
                  </td>
                    
                  </tr>
                ))}
               
              </tbody>
            </table>
          </div>
        </div>
        
        {adminFormState? (
          <div className='editing-section pt-5  w-[38%]' style={{ minHeight: '550px'}}>
            <AdminAddForm />
          </div>
        ):(
          <div className='editing-section pt-5  w-[38%]' style={{ minHeight: '550px'}}>
            <AdminUpdateForm updateData={updateData} />
          </div>
        )}

        
          
      </div>
    </div>
  )
}

export default AdminDetails