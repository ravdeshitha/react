import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { MdLightMode,MdDarkMode,MdWebStories } from "react-icons/md";


function TopNavigation(props) {
    const [darkTheme, setDarkTheme] = useState(true);
    //dark mode light mode text color
    let textColor = 'dark';

    const themeHandle = () =>{
      if(darkTheme){
        setDarkTheme(!darkTheme);
        props.setThemeMode('light');
        textColor = 'light';
      }
      else{
        setDarkTheme(!darkTheme);
        props.setThemeMode('dark');
        textColor = 'dark';
      }
    }

    


    const sidebarTypeHandle = (type) =>{
        props.setSidebarType(type);
    }
  return (
    <>
        <div className='topNavigation flex'>
          
          {/*Company Logo */}
          <div className='logo w-[300px]'>
              <h1 className={`w-full text-center pt-4  text-[30px] `}>WASANA</h1>
          </div>

          
          <div className='bar w-screen'>

            {/* Company Type button */}
            <div className="navigationButton h-[5vh] flex justify-between ">
                <Link to={'/admin/main'} className={`top-navigation-button `} onClick={() => sidebarTypeHandle('main')}>Main</Link>

                <Link to={'/admin/bakers'} className={`top-navigation-button `} onClick={() => sidebarTypeHandle('bakery')}>Bakery</Link>

                <Link to={'/admin/gimanhala'} className={`top-navigation-button `} onClick={() => sidebarTypeHandle('gimanhala')}>Gimanhala</Link>
            </div>

            <div className='secondLine h-[5vh] bg-slate-50 justify-between  flex'>
              <div className='w-2'></div>
              <div className='topNavigationIcon flex text-[25px] text-slate-600 pt-2 mr-3'>
                <Link className='mr-2' onClick={themeHandle}>{darkTheme?  <MdLightMode /> : <MdDarkMode /> }</Link>
                
                <Link to={'/'} className='mr-2'><MdWebStories /></Link>

                <Link><FaUserCircle /></Link>
              </div>

            </div>

          </div>

        </div>
    </>
  )
}

export default TopNavigation