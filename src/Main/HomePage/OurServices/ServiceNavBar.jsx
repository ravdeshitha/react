import { GiCakeSlice } from "react-icons/gi";
import { GiUmbrellaBayonet } from "react-icons/gi";
import { FaChair } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import {Link} from "react-router-dom";

const styleList = "px-6 sm:px-10 ";
const styleIcon = "block absolute text-2xl sm:text-4xl md:hidden  hover:text-5xl ";
const styleName = "hidden  md:block font-bold lg:text-lg";

export default function ServiceNavBar() {
  return (
    <div className=" mt-20 static h-[fit-content] w-[90%] bg-red-900 text-white  mx-auto rounded-full ">
      <ul className="justify-center justify-[content] h-20  flex text-center items-center">
        <div className="w-30 h-20 p-6 flex ">
          <li className={styleList}>
            {" "}
            <GiCakeSlice className={styleIcon} />{" "}
            <span className={styleName}><Link to="/wasna-bakers" >Wasana Bakers</Link></span>{/* Ravindu - I add this /wasna-bakers link as temporary*/}
          </li>
          <li className={styleList}>
            {" "}
            <GiUmbrellaBayonet className={styleIcon} />{" "}
            <span className={styleName}><Link to="/wasana-gimanhala" >Gimanhala</Link></span>{/* Ravindu - I add this /wasana-gimanhala link as temporary*/}
          </li>
          <li className={styleList}>
            {" "}
            <FaChair className={styleIcon} />{" "}
            <span className={styleName}><Link to="/wasna-reception-hall" >Reception Hall</Link></span>{/* Ravindu - I add this /wasna-reception-hall link as temporary*/}
          </li>
          <li className={styleList}>
            {" "}
            <FaCar className={styleIcon} />{" "}
            <span className={styleName}><Link to="#" >Clean & Care Service</Link></span>
          </li>
          <li className={styleList}>
            {" "}
            <FaHelmetSafety className={styleIcon} />{" "}
            <span className={styleName}><Link to="#" >Builders & Engineers</Link></span>
          </li>
        </div>
        {/*  */}
      </ul>
    </div>
  );
}
