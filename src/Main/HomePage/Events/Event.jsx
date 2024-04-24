import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';

function Event() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/mainHome/events`)
          .then(res => {
            setEvents(res.data.result);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
    }, []);

    useEffect(() => {
        AOS.init({ duration: "1000" });
    }, []);

    return (
        <div className='h-[100vh] pt-[15vh]'>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Slide easing="ease" duration={5000}>
                        {events.map((item, index) => (
                            <div key={index} data-aos="fade-up" className="w-full h-[400px] lg:h-[600px] m-auto relative">
                                <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.coverImg} alt="cover" className="w-full h-[400px] lg:h-[600px]" />
                                <div className="absolute inset-0 bg-black opacity-85"></div> 
                                <div className='flex'>
                                    <div className='w-1/2'>
                                        <div data-aos="fade-up-left" className=" absolute inset-0 flex justify-center items-center md:justify-end md:items-start">
                                            <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.logoImg} alt="logo" className="rounded-md  md:max-w-[350px] md:max-h-[400px] md:mr-8 lg:max-w-[600px] lg:max-h-[400px] lg:mr-32  max-w-[250px] mt-[-200px] sm:max-w-[300px] sm:mt-[-200px] lg:mt-[100px] md:mt-[50px] " /> {/* logo image */}
                                        </div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className="w-full flex justify-end">
                                            <div data-aos="fade-up-left" className="absolute w-[25vw] h-[15vh] mt-48  sm:w-[20vw] sm:h-[20vh] md:w-[20vw] md:h-[25vh]  lg:w-[14vw] lg:h-[40vh] inset-0 md:mt-16 lg:mt-32 ml-[12%] sm:ml-[10%] lg:ml-[5%]">
                                                <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.img1} alt="image1" className="rounded-md h-full w-full object-cover overflow-hidden" /> {/* image 1 */}
                                            </div>
                                            <div data-aos="fade-up-right" className="absolute w-[25vw] h-[15vh] mt-48 ml-[62%] sm:w-[20vw] sm:h-[20vh] md:w-[20vw] md:h-[25vh]  lg:w-[14vw] lg:h-[40vh] right-0 inset-0 md:ml-[35%]  md:mt-16 lg:mt-32 sm:ml-[65%] lg:ml-[22%]">
                                                <img src={import.meta.env.VITE_LOCAL_IMG_PATH + item.img2} alt="image2" className="rounded-md overlay h-full w-full object-cover overflow-hidden" /> {/* image 2 */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-aos="fade-up" className="absolute bottom-0 left-0 right-0 flex justify-center mb-6 ">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black font-bold py-2 px-4  rounded-full">Visit Event</button>
                                </div>
                            </div>
                        ))}
                    </Slide>
                )}
            </div>
        </div>
    );
}

export default Event;
