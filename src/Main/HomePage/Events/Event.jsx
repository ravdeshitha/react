import React,{useEffect, useState} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Slider from "react-animated-slider";  //npm install react-animated-slider@^1
import "./horizontal.css";

import axios from 'axios';

//import "./slider-animations.css";

import cover from "./cover.png"
import logo from "./logo.png"
import image1 from "./image1.png"
import image2 from "./image2.png"


const content = [
    {
    coverImage: "cover",
    logo: "logo",
    image1: "image1",
    image2: "image2"
    },
    {
        coverImage: "cover",
        logo: "logo",
        image1: "image2",
        image2: "image1"
    },
    {
        coverImage: "cover",
        logo: "logo",
        image1: "image2",
        image2: "image1"
    }
];



function Event() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('https://test-repo-2xuo.onrender.com/api/mainHome/events')
          .then(res => {
            setEvents(res.data.result);
          })
          .catch(err => {
            console.log(err);
          });
    }, []);
    console.log(events);

    useEffect(()=>{
        AOS.init({duration: "1000"});
    },[]);
    
    
  return (
    <>
        <Slider>
        
        
            {events.map((item, index) => (
            <div  key={index}>
                <div data-aos="fade-up" className="w-full h-[400px] lg:h-[600px]   m-auto relative ">
                    <div className="mx-auto  items-center justify-center  ">
                        <div className="relative">
                            <img src={'http://localhost:8080/images/' + item.coverImg} alt="cover" className="w-full  h-[400px] lg:h-[600px]  " /> {/** cover photo for event post */}
                            <div className="absolute inset-0 bg-black opacity-85 h-[400px] lg:h-[600px]"></div> {/** black overlay */}
                                <div data-aos="fade-right"className="absolute inset-0 w-[300px] h-[250px] ml-20  justify-center lg:w-[600px] lg:h-[600px] lg:mt-[150px] md:w-[400px] md:h-[400px] md:mt-[100px] md:left-[-10%] lg:left-[10%]">
                                    <img src={'http://localhost:8080/images/' + item.logoImg} alt="logo" className="w-[80%] h-auto rounded-md overlay " /> {/** logo photo for event post */}
                                </div>
                                <div className="flex justify-arround">
                                    <div data-aos="fade-up-left" className="absolute inset-0 w-[120px] h-[150px]  flex justify-center left-[15%] mt-[150px] lg:w-[250px] lg:h-[375px] lg:left-[50%] lg:mt-[100px] md:w-[150px] md:h-[225px] md:left-[50%] md:mt-[75px]">
                                        <img src={'http://localhost:8080/images/' + item.img1} alt="logo" className="w-full h-full rounded-md overlay  top-1/2   " /> {/** image1 photo for event post */}
                                    </div>
                                    <div data-aos="fade-up-right" className="absolute inset-0 w-[120px] h-[150px]  flex justify-center left-[55%] mt-[150px] 
                                    lg:w-[250px] lg:h-[375px] lg:left-[65%] lg:mt-[100px] md:w-[150px] md:h-[225px] md:left-[70%] md:mt-[75px]">
                                        <img src={'http://localhost:8080/images/' + item.img2} alt="logo" className="w-full h-auto rounded-md overlay  top-1/2 transform  " /> {/** image2 photo for event post */}
                                    </div>
                                </div>      
                            <div data-aos="fade-up" className=" h-auto mt-[-80px] flex justify-center lg:mt-[-80px] lg:left-[70%] lg:justify-end lg:mr-[625px] md:left-[70%] md:justify-end md:mr-48">
                                <button className="relative  inset-0 bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black font-bold py-2 px-4 rounded-full">Visit Event</button>
                            </div>
                        </div>
                    </div>
                </div>
           
            
            </div>
            ))}
        
    
    </Slider>
    </>
  )
}

export default Event

