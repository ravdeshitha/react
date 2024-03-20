import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';

//Admin dasboard navigation bars
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

//Company admin dashboard main pages
import AdminMain from './AdminMain/AdminMain';
import AdminBakery from './AdminMain/AdminBakery';
import AdminGimanhala from './AdminMain/AdminGimanhala';

//tailwind custom css files
import './adminDashboardStyle.css';



function AdminDashboard() {

    const [sidebarType, setSidebarType] = useState('main');
    const [themeMode, setThemeMode] = useState('dark');


  return (
    <>
        <div className="Admin-dashboard">
            
            {/* Top navigation section */}
            <div className={`top-navigation h-[10vh] ${themeMode}`}>
                <TopNavigation setSidebarType={setSidebarType} setThemeMode={setThemeMode}/>
            </div>

           <div className="secont-section flex h-[90vh] w-screen ">
                 {/* Side navigation section */}
                <div className={`side-navigation w-[300px] ${themeMode}`}>
                    <SideNavigation themeMode={themeMode} sidebarType={sidebarType}/>
                </div>

                {/* Workplace Area */}
                <div className="admin-workpalce text bg-slate-400 w-full">
                    <Routes>
                        {/* Main page admin dashboard */}
                        <Route path='/main/*' element={<AdminMain />} />

                        {/* Bakery page admin dashboard */}
                        <Route path='/bakers/*' element={<AdminBakery />} />

                        {/* Gimanhala adminDashboard */}
                        <Route path='/gimanhala/*' element={<AdminGimanhala />} />
                    </Routes>
                </div>
           </div>
        </div>
        
        
        
        
        
    </>
  )
}

export default AdminDashboard