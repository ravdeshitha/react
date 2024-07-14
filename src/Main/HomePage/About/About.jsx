import { useEffect } from "react";
import logo from "./Logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);
  return (
    <section className="flex items-center bg-stone-100 xl:h-[80%] font-poppins pt-[10vh]">
      <div
        data-aos="fade-up"
        className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-4 md:px-6 "
      >
        <div className="flex flex-wrap ">
          <div className="w-full mb-10 px-4 lg:w-1/2 lg:mb-0">
            <div className="relative lg:max-w-md">
              <img
                src={import.meta.env.VITE_LOCAL_IMG_PATH + "eventIMG_1712995637812.jpeg"}
                alt="aboutimage"
                className="relative z-10 object-cover   rounded h-48 w-48 sm:h-96 sm:w-96 m-auto "
              />{" "}
              {/* about us logo*/}
            </div>
          </div>
          <div className="w-full px-6 lg:w-1/2 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 border-red-500 ">
              <span className="text-sm text-gray-600 uppercase dark:text-gray-400 text-[25px]">
                Who we are?
              </span>
              <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-6xl dark:text-black-300 text-[40px">
                About Us
              </h1>
            </div>

            <p className="mb-6 text-base leading-8 text-gray-500 dark:text-black-400 text-[25px]">
              The seed of Horana Wasana Bakery was planted by Mr. Dayananda
              Bobuwala and his wife Mrs. Anusha Wijayanthi Perera. In the search
              for a name for this new bakery, he wanted to add the name of the
              city Horana, which has a strong connection since his childhood.
              The foundation of Wasana Bakers was laid in 1995 when the current
              owner and his wife established it in Ratiyala, Govinna in Western
              Province.
            </p>

            <div className="flex justify-center">
              {/* <a
                href="#"
                className="px-4 py-2 text-gray-100 bg-orange-500 rounded dark:bg-orange-600 dark:hover:bg-orange-500 hover:bg-orange-600 text-[18px]"
              >
                Load more
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
