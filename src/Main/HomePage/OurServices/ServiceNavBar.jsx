import { GiCakeSlice } from "react-icons/gi";
import { GiUmbrellaBayonet } from "react-icons/gi";
import { FaChair } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { Link } from "react-router-dom";

const styleList =
  "mx-2 px-0 pt-4 h-[100px] w-52 sm:px-3 bg-white  text-red-800 hover:bg-red-800 hover:text-white our-service-link-box-shadow rounded-sm";
const styleIcon =
  "block text-2xl sm:text-4xl   sm:hover:text-5xl md:hover:text-4xl mx-auto ";
const styleName = "hidden  md:block font-bold lg:text-lg";

export default function ServiceNavBar() {
  return (
    <div className="static h-[fit-content] w-[90%] mx-auto  ">
      <ul className="justify-center  h-[120px]  flex text-center items-center">
        <div className="flex ">
          <Link to="/wasna-bakers">
            <li className={styleList}>
              {" "}
              <GiCakeSlice className={styleIcon} />{" "}
              <span className={styleName}>Wasana Bakers</span>
              {/* Ravindu - I add this /wasna-bakers link as temporary*/}
            </li>
          </Link>
          <Link to="/wasana-gimanhala">
            <li className={styleList}>
              {" "}
              <GiUmbrellaBayonet className={styleIcon} />{" "}
              <span className={styleName}>Gimanhala</span>
              {/* Ravindu - I add this /wasana-gimanhala link as temporary*/}
            </li>
          </Link>
          <Link to="/wasna-reception-hall">
            <li className={styleList}>
              {" "}
              <FaChair className={styleIcon} />{" "}
              <span className={styleName}>Reception Hall</span>
              {/* Ravindu - I add this /wasna-reception-hall link as temporary*/}
            </li>
          </Link>
          <Link to="#">
            <li className={styleList}>
              {" "}
              <FaCar className={styleIcon} />{" "}
              <span className={styleName}>Clean & Care Service</span>
            </li>
          </Link>
          <Link to="#">
            <li className={styleList}>
              {" "}
              <FaHelmetSafety className={styleIcon} />{" "}
              <span className={styleName}>Builders & Engineers</span>
            </li>
          </Link>
        </div>
        {/*  */}
      </ul>
    </div>
  );
}
