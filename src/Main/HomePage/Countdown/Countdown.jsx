import { useState, useEffect } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import AOS from "aos"; /* for animation  aos package*/
import "aos/dist/aos.css";

export default function Countdown() {
  const [counterOn, setCounterOn] = useState(false);

  /* for animation part */
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);

  return (
    <>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className=" grid grid-cols-2 md:flex pl-6 pb-5 sm:w-[100%] md:h-[300px] lg:w-[80%] md:m-auto md:pt-[px] md:mt-[100px] w-[100%] h-auto justify-around items-center my-10 bg-[#2B5D7D]">
          {/*counter one box part start*/}

          <div data-aos="fade-right">
            <div className="w-28 h-28 m-5 rounded-2xl   transform transition-transform hover:scale-110 ">
              <h1 className="text-4xl p-5 pb-3  text-center text-white md:text-6xl">
                {counterOn && (
                  <CountUp start={0} end={100} duration={2} delay={0} />
                )}
                +
              </h1>
              <p className=" text-center pb-5 text-lg text-white md:text-4xl">
                Employees
              </p>
            </div>
          </div>
          {/*counter one box part end*/}

          <div data-aos="fade-right">
            <div className="w-28 h-28 m-5 rounded-2xl   transform transition-transform hover:scale-110">
              <h1 className="text-4xl p-5 pb-3  text-center text-white md:text-5xl">
                {counterOn && (
                  <CountUp start={0} end={5} duration={2} delay={0} />
                )}
                +
              </h1>
              <p className=" text-center pb-5 text-lg text-white md:text-2xl">
                Our services
              </p>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="w-28 h-28 m-5 rounded-2xl   transform transition-transform hover:scale-110">
              <h1 className="text-4xl p-5 pb-3  text-center text-white md:text-5xl">
                {counterOn && (
                  <CountUp start={0} end={10} duration={2} delay={0} />
                )}
                +
              </h1>
              <p className=" text-center pb-5 text-lg text-white md:text-2xl">
                Year of Caring
              </p>
            </div>
          </div>
          <div data-aos="fade-left">
            <div className="w-28 h-28 m-5 rounded-2xl   transform transition-transform hover:scale-110">
              <h1 className="text-4xl p-5 pb-3  text-center text-white md:text-5xl">
                {counterOn && (
                  <CountUp start={0} end={5} duration={2} delay={0} />
                )}
                +
              </h1>
              <p className=" text-center pb-5 text-lg text-white md:text-2xl">
                Comunity Project
              </p>
            </div>
          </div>
        </div>
      </ScrollTrigger>

      
    </>
  );
}
