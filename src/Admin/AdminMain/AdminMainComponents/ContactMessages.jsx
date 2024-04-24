import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContactMessageContent from './ContactMessageContent';
import { IoMdCloseCircle } from 'react-icons/io';

function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [messageData, setMessageData] = useState();
    
    const handleMessage = (message) => {
        if(!showMessage){
            setShowMessage(true);
        }

        setMessageData(message);
    }

    const deleteMessage = async(msgId) => {
        await axios.delete(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/contact/${msgId}`, { withCredentials: true })
        .then(res =>{
            console.log("success");
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        })
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/adminBoard/main/contact`, { withCredentials: true })
            .then(res => {
                setMessages(res.data.result);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const formatReceivedTime = receivedTime => {
        const receivedDate = new Date(receivedTime);
        const currentDate = new Date();

        if (receivedDate.toDateString() === currentDate.toDateString()) {
            // Display time if the message was received today
            const hours = receivedDate.getHours();
            const minutes = receivedDate.getMinutes();
            return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        } else if (receivedDate.getFullYear() === currentDate.getFullYear()) {
            // Display month and day if the message was received in the same year
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = receivedDate.getMonth();
            const day = receivedDate.getDate();
            return `${day} ${months[monthIndex]}`;
        } else {
            // Display full date if the message was received in a different year
            return receivedDate.toLocaleDateString();
        }
    };


    return (
        <div className='ContactMessages'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Gallery</h2>
                <hr className='h-[2px] border-slate-300 mt-6' />
            </div>

            <div className='w-[96%] h-[74vh] mt-2 rounded-lg overflow-hidden m-auto bg-slate-200 box-shadow-1 flex'>
                <div className='list w-[30%] h-full overflow-y-auto bg-slate-300'>
                    {messages.map((message, index) => (
                        <div
                            className={`w-full px-2 py-1 flex justify-between border ${message.msgState === 'no' ? 'border-green-500 bg-green-400/20' : message.msgState === 'read' ? 'border-blue-500 bg-blue-500/20' : 'border-black'}`}
                            key={index} 
                            onClick={() =>{handleMessage(message)}}
                        >
                            <div>
                                <h3 className='font-bold'>{message.firstName + ' ' + message.lastName}</h3>
                                <p>{message.email}</p>
                            </div>

                            <div className='relative'>
                                <div className='deletebut absolute top-0 right-0'>
                                    <IoMdCloseCircle
                                        className='text-red-600 cursor-pointer'
                                        onClick={() => deleteMessage(message.msgId)}
                                    />
                                </div>
                                <h4 className='text-[12px] font-bold mt-8'>{formatReceivedTime(message.receivedTime)}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                
                {showMessage ? (
                    <div className='message w-[70%] h-full'>
                        <ContactMessageContent messageData={messageData}/>
                    </div>
                ): (
                    <div className='message w-[70%] h-full flex flex-col justify-center items-center text-[30px] font-bold text-slate-600'>
                        <h3>Wasana Bakers Pvt LTD</h3>
                        <h3>Messages</h3>
                    </div>
                ) 
                    
                }
                
            </div>
        </div>
    );
}

export default ContactMessages;
