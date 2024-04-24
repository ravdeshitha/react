import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

function ContactMessageContent({ messageData }) {
    const { currentUser } = useContext(AuthContext);
    const message = messageData || null;
    const [reply, setReply] = useState({
        email: message?.email || '',
        subject: `Reply Of '${message?.subject || ''}'`,
        firstName: message?.firstName || '',
        replyMsg: '',
        prevMsg: message?.message || '',
        replyAdmin: currentUser?.adminId || ''
    });

    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        setReply({ ...reply, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleReply = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach(file =>{
            formData.append('attachments', file);
        });
        formData.append('reply', JSON.stringify(reply));

        await axios.post(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/sendEmail/${message.msgId}`, formData, {withCredentials: true})
        .then(res =>{
            console.log("success");
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        })
    };


    const handleRead =() =>{
        let msgState;
        if(message.msgState === 'no'){
            msgState = 'read';
        }
        else{
            msgState = 'no';
        }
        axios.put(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/contact/${message.msgId}`,{msgState}, {withCredentials: true})
        .then(res =>{
            console.log("success");
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        })
    }

    return (
        <div className='w-full h-full'>
            <div className='messageHead w-full h-[20vh] bg-gray-500 p-3'>
                <div className='flex justify-between'>
                    <div className='w-[50%] flex gap-3'>
                        <h3 className='font-bold text-slate-200'>Name:</h3>
                        <p>{`${message?.firstName} ${message?.lastName}`}</p>
                    </div>

                    <div className='w-[50%] flex gap-3'>
                        <h3 className='font-bold text-slate-200'>Phone Number:</h3>
                        <p>{message?.phoneNumber}</p>
                    </div>
                </div>

                <div className='w-[50%] flex gap-3'>
                    <h3 className='font-bold text-slate-200'>Email:</h3>
                    <p>{message?.email}</p>
                </div>

                <hr className='mt-5' />

                <h3 className='text-[25px] font-bold capitalize text-slate-300'>{message?.subject}</h3>
            </div>

            <div className='messageData w-full h-[52vh] flex mt-2 mb-2'>
                <div className='message w-[50%] h-full px-2 border-r-2 border-slate-400'>
                    <h3 className='pl-2 text-[19px] font-bold mb-2'>Message</h3>

                    <div className='h-[40vh] w-full resize-none overflow-y-auto p-1 bg-slate-50/0 border-2 border-slate-400/50 rounded-lg'>
                        <p>{message?.message}</p>
                    </div>

                    <div className='pl-2 flex gap-5 mt-3'>
                    <input
                        type='checkbox'
                        value='read'
                        className='w-6 h-6'
                        onChange={handleRead}
                        checked={message.msgState === 'read' || message.msgState === 'replied'}
                        disabled={message.msgState === 'replied'}
                    />
                        <p className='font-bold'>Mark As Read</p>
                    </div>
                </div>

                <div className='reply w-[50%] h-full px-2'>
                    <form onSubmit={handleReply}>
                        <h3 className='pl-2 text-[19px] font-bold mb-2'>Reply</h3>

                        <textarea
                            className='h-[40vh] w-full resize-none p-1 bg-slate-50/0 border-2 border-slate-400/50 rounded-lg'
                            placeholder='Type your reply...'
                            required
                            name='replyMsg'
                            value={message.replyMsg ? message.replyMsg : reply.replyMsg}
                            onChange={handleChange}
                            readOnly={!!message.replyMsg}
                        ></textarea>

                        <div className='flex w-full justify-center relative'>
                            <div className='w-40 h-10 bg-slate-500 rounded-lg border-2 border-slate-900 relative cursor-pointer'>
                                <h3 className='text-center mt-1 text-slate-200'>Add Attachment</h3>
                                <input
                                    type='file'
                                    name='attachments'
                                    multiple
                                    onChange={handleFile}
                                    className='w-full h-full opacity-0 cursor-pointer absolute'
                                    
                                />
                            </div>
                            <button className='bg-slate-500 text-slate-50 font-bold p-2 w-20 rounded-lg absolute right-1' type='submit'>{message.replyMsg ? 'Re Send' : 'Send'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactMessageContent;
