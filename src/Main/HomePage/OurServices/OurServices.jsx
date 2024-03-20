import BgImg_1 from "./assets/sweet-pastry-assortment-top-view.jpg";
import BgImg_2 from "./assets/delicious-donuts.jpg";
import BgImg_3 from "./assets/ice-cream-balls-with-cookies.jpg";

import ServiceNavBar from "./ServiceNavBar";
import ServiceBody from "./ServiceBody";

const serviceList = [
  {
    companyName: "Wasana Bakers",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit.  ",
    backImg: BgImg_1,
    frontImg: BgImg_2,
    logo: "T",
    color: "text-red-700",
    titleColor: "text-blue-700",
  },
  {
    companyName: "Wasana Gimanhala",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit. ",
    backImg: BgImg_2,
    frontImg: BgImg_3,
    logo: "T",
    color: "text-green-700",
    titleColor: "text-yellow-500",
  },
  {
    companyName: "Reception Hall",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit. ",
    backImg: BgImg_1,
    frontImg: BgImg_3,
    logo: "T",
    color: "text-rose-700",
    titleColor: "text-orange-500",
  },
  {
    companyName: "Clean & Service",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit. ",
    backImg: BgImg_3,
    frontImg: BgImg_1,
    logo: "T",
    color: "text-blue-700",
    titleColor: "text-lime-500",
  },
  {
    companyName: "Builders & Engineers",
    title: "Let's make life a little easier!",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. sit amet consectetur adipisicing elit. ",
    backImg: BgImg_1,
    frontImg: BgImg_2,
    logo: "T",
    color: "text-fuchsia-700",
    titleColor: "text-yellow-700",
  },
];

export default function OurServices() {
  return (
    <div className="h-[90vh] ">
      <ServiceNavBar />

      <div className="max-w-lg md:max-w-3xl m-auto ">
        <ServiceBody autoSlide={true} autoSlideInterval={7000}>
          {serviceList}
        </ServiceBody>
      </div>
    </div>
  );
}
