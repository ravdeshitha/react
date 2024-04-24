import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//icons
import { MdTableChart } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function UserList() {

  const [userList, setUserList] = useState([]);

  useEffect(() =>{
    const fetchUserList = async() =>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/userList`, { withCredentials: true });
        setUserList(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchUserList();
  },[]);

  const handleDelete = async(userId) =>{
    try{
      const res = await axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/userList/${userId}`, { withCredentials: true });
      console.log(res.data);
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='w-full h-[90vh]'>
      <div className='pt-6 text-3xl text-slate-800'>
        <h2 className='ml-10 font-semibold text-slate-600'>User List</h2>
        <hr className='h-[2px] border-slate-300 mt-6'/>
      
      </div>
      
      <div className='table-section pt-10'>
        <div className='h-9 bg-white w-[90%] pt-1 pl-2 ml-[5%] mr-[5%]'>
          <div className='flex w-[200px]'>
            <MdTableChart className='text-slate-700 text-[20px] m-1'/> User List
          </div>
        </div>

        <div className='w-[90%] h-[80%] m-auto'  style={{ maxHeight: '600px', overflowY: 'auto' }}>
          
          
          <table className='min-w-full divide-y divide-gray-200 w-full' >
            
            <thead className='sticky top-0'>
              <tr className='h-9 w-full bg-gray-500 text-slate-200'>
                <th className='w-[5%] pl-2 font-bold text-left text-xs  text-gray-200 uppercase tracking-wider'>No.</th>
                <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Name</th>
                <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>Phone</th>
                <th className='w-[20%] font-bold text-left text-xs text-gray-200 uppercase tracking-wider'>UserType</th>
                <th className='w-[10%] font-bold text-center text-xs text-gray-200 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {userList.map((row, index) =>(
                <tr key={index} className={`${index%2 === 0? 'bg-gray-200': 'bg-gray-300'} h-9`}>
                  <td className='pl-3'>{index+1}</td>
                  <td>{row.fullName}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.userType}</td>
                  <td className='pl-5 flex'>
                    {/* <Link to='' ><CiEdit className= 'w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800'/></Link> */}
                    <button onClick={() =>handleDelete(row.userId)} ><MdDelete className='w-6 h-6 m-1 mx-2 text-gray-800 rounded border-2 border-gray-800' /></button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList