import Bakery_1 from "./assets/bakery1.jpg";
import Bakery_2 from "./assets/bakery2.jpg";
import Gimanhala_1 from "./assets/gim1.jpg";
import Gimanhala_2 from "./assets/gim2.jpg";
import Reception_1 from "./assets/rec1.jpg";
import Reception_2 from "./assets/rec2.jpg";
import Clean_1 from "./assets/clean1.jpg";
import Clean_2 from "./assets/clean2.jpeg";
import Build_1 from "./assets/build1.jpeg";
import Build_2 from "./assets/build2.jpg";

//Logos
import WBakers_logo from "./assets/wasana-logo.png";
import WGimanhala_logo from "./assets/katharagama.png";
import ReceptionHall_logo from "./assets/resep.png";
import CleanService_logo from "./assets/Clean.png";
import WBuilder_logo from "./assets/builders.png";

import ServiceNavBar from "./ServiceNavBar";
import SlideShow from "./SlideShow";

const serviceList = [
  {
    companyName: "Wasana Bakers",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit.  ",
    backImg: Bakery_1,
    frontImg: Bakery_2,
    logo: WBakers_logo,
    color: "text-red-700",
    bgColor: "bg-red-700",
    titleColor: "text-blue-700",
    path: "/wasna-bakers",
  },
  {
    companyName: "Wasana Gimanhala",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet Wasana Gimanhala adipisicing elit. sit amet consectetur adipisicing elit. ",
    backImg: Gimanhala_1,
    frontImg: Gimanhala_2,
    logo: WGimanhala_logo,
    color: "text-green-700",
    bgColor: "bg-green-700",
    titleColor: "text-yellow-500",
    path: "/wasana-gimanhala",
  },
  {
    companyName: "Reception Hall",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet Reception Hall adipisicing elit. ",
    backImg: Reception_1,
    frontImg: Reception_2,
    logo: ReceptionHall_logo,
    color: "text-rose-700",
    bgColor: "bg-rose-700",
    titleColor: "text-orange-500",
    path: "/wasna-reception-hall",
  },
  {
    companyName: "Clean & Service",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit Clean & Service consectetur adipisicing elit. ",
    backImg: Clean_1,
    frontImg: Clean_2,
    logo: CleanService_logo,
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    titleColor: "text-lime-500",
    path: "/wasna-reception-hall",
  },
  {
    companyName: "Builders & Engineers",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing Builders & Engineers. sit amet consectetur adipisicing elit. ",
    backImg: Build_1,
    frontImg: Build_2,
    logo: WBuilder_logo,
    color: "text-fuchsia-700",
    bgColor: "bg-fuchsia-700",
    titleColor: "text-yellow-700",
    path: "/wasna-reception-hall",
  },
];

export default function OurServices() {
  return (
    <div className="h-[100vh] pt-10 bg-blue-100 ">
      <div className="h-[5vh]"></div>
      <div className="h-[15vh]">
        <ServiceNavBar />
      </div>

      {/* <div className="max-w-lg md:max-w-3xl m-auto ">
        <ServiceBody autoSlide={true} autoSlideInterval={7000}>
          {serviceList}
        </ServiceBody>
      </div> */}
      <div className="h-[70vh]">
        <SlideShow slides={serviceList} />
      </div>
    </div>
  );
}
