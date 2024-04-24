import MainNav from "./HomePage/NaviBar/MainNav";
import OurServices from "./HomePage/OurServices/OurServices";
import MainSlideShow from "./HomePage/MainSlideShow/MainSlideShow";

import About from "./HomePage/About/About";
import Countdown from "./HomePage/Countdown/Countdown";
import Event from "./HomePage/Events/Event";
import Footer from "./HomePage/Footer/Footer";
import ContactUs from "./HomePage/ContactUs/ContactUs";
import Owners from "./HomePage/Owners/Owners";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const location = useLocation();

  const [id, setId] = useState(location?.state?.id && location.state.id);

  const handleScroll = (event) => {
    // Your scroll handling logic here
    console.log("Scrolling...", event.target.scrollTop);
  };

  const scrollToTarget = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToTarget(id);
  }, [id]);

  return (
    <div className="bg-slate-100">
      <MainNav scrollToTarget={scrollToTarget} />

      <section id="mainSlideShow">
        {" "}
        <MainSlideShow
          autoSlide={true}
          autoSlideInterval={7000}
          onScroll={handleScroll}
        />
      </section>

      <section id="services">
        <OurServices />
      </section>

      <section id="events">
        <Event />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="countdown">
        <Countdown />
      </section>

      <section id="owners">
        <Owners />
      </section>

      <section id="contact">
        <div className="h-[8vh]"></div>
        <ContactUs />
      </section>

      {/* Footer  */}
      <Footer />
    </div>
  );
}
