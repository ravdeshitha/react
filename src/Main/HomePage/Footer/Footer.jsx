import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-gray-200">
      <div>
        <div className=" bg-red-950 text-white ">
          <div className="pt-3 py-0.5 text-xl text-center font-bold">
            <p>Wasana Bakers pvt Ltd</p>
          </div>

          <div className="px-8 py-6 p-0 flex justify-center">
            <div className="sm:flex sm:items-center">
              <div className="flex items-center">
                <div className=" pr-8 ">
                  <ul className="text-gray-200">
                    <li className="flex items-center mr-0 mb-6">
                      <i className="w-10 h-10 rounded-full mx-1 inline-block pt-1">
                        <BiSolidPhoneCall />
                      </i>
                      <p className="space-x-0">+94342250000</p>
                    </li>

                    <li className="flex items-center mr-0 mb-6">
                      <i className="w-10 h-10 rounded-full mx-1 inline-block pt-1">
                        <IoMail />
                      </i>
                      <p className="space-x-0">info@wasanabakers.lk</p>
                    </li>

                    <li className="flex items-center mr-0 mb-5">
                      <i className="w-10 h-10 rounded-full mx-1 inline-block pt-1">
                        <IoLocationSharp />

                      </i>
                      <p className="space-x-0">
                        Wasana Bakers Pvt Ltd,<br></br>Retiyala,Horana,Sri Lanka
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-gray-200 h-44 mx-4"></div>

                <div className="pb-0 px-7 flex items-center justify-center sm:px-16">
                  <ul className="text-gray-200">
                    <li className="pb-3.5"><Link to={'/'}>Home</Link></li>
                    <li className="pb-3.5"><Link to={'/wasana-bakers'}>Wasana Bakers</Link></li>
                    <li className="pb-3.5"><Link to={'/wasana-gimanhala'}>Wasana Gimanhala</Link></li>
                    <li className="pb-3.5"><Link to={'/wasna-reception-hall'}>Reception Hall</Link></li>
                    <li className="pb-3.5"><Link to={'/'}>Clean & Care</Link></li>
                    <li className="pb-3.5"><Link to={'/'}>Builders & Engineers</Link></li>

                  </ul>
                </div>
              </div>

              {/* end */}

              <div className="hidden sm:block border-l-2 border-gray-200 h-44 mx-4 "></div>

              {/* icons */}
              <div className="hidden sm:block  items-center sm:items-center sm:justify-center sm:pl-8 ">
                <ul className="text-gray-200">
                  <div className="flex">
                    <li className="w-10 h-10 rounded-full mx-1  pt-1">
                      <FaFacebookSquare />
                    </li>
                    <span className="hidden md:block">Facebook</span>
                  </div>
                  <div className="flex">
                    <li className="w-10 h-10 rounded-full mx-1  pt-1">
                      <FaInstagramSquare />
                    </li>
                    <span className="hidden md:block">Instagram</span>
                  </div>
                  <div className="flex">
                    <li className="w-10 h-10 rounded-full mx-1  pt-1">
                      <FaTwitter />
                    </li>
                    <span className="hidden md:block">Twitter</span>
                  </div>
                  <div className="flex">
                    <li className="w-10 h-10 rounded-full mx-1  pt-1">
                      <FaYoutube />
                    </li>
                    <span className="hidden md:block">YouTube</span>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className=" sm:hidden  flex items-center justify-center">
                    <ul className="text-gray-200">
                        <li className="w-10 h-10 rounded-full mx-1 inline-block pt-1"><FaFacebookSquare/></li>
                        <li className="w-10 h-10 rounded-full mx-1 inline-block pt-1"><FaInstagramSquare/></li>
                        <li className="w-10 h-10 rounded-full mx-1 inline-block pt-1"><FaTwitter/></li>
                        <li className="w-10 h-10 rounded-full mx-1 inline-block pt-1"><FaYoutube/></li>
                       
                    </ul>
                </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
