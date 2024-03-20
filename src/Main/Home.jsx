import MainNav from "./HomePage/NaviBar/MainNav";
import OurServices from "./HomePage/OurServices/OurServices";
import { Link } from "react-router-dom";
import MainSlideShow from "./HomePage/MainSlideShow/MainSlideShow";

import About from "./HomePage/About/About";
import Countdown from "./HomePage/Countdown/Countdown";
import Event from "./HomePage/Events/Event";
import Footer from "./HomePage/Footer/Footer";
import ContactUs from "./HomePage/ContactUs/ContactUs";
import Owners from "./HomePage/Owners/Owners";


export default function Home() {
  const handleScroll = (event) => {
    // Your scroll handling logic here
    console.log("Scrolling...", event.target.scrollTop);
  };

  return (
    <div className="bg-slate-100">
      {/* Navigation Bar */}
      <MainNav />

      {/* Main Slide show */}
      <MainSlideShow
        autoSlide={true}
        autoSlideInterval={7000}
        onScroll={handleScroll}
      />
      {/* Our Services  */}
      <OurServices />
      {/* <SlideShow /> */}
      {/* Events  */}
      <Event/>
      {/* About  */}
      <About />
      <Countdown/>
      {/* Owners & Founders  */}
      <Owners />
      {/* Contact us  */}
      <ContactUs />
      
      {/* Footer  */}
      <Footer />
    </div>
  );
}
