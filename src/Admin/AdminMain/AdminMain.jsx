import React from 'react';
import { Route, Routes } from 'react-router-dom';

//import css file
import './AdminMain.css';

//import main dashboard components
import UserList from './AdminMainComponents/UserList';
import AdminDetails from './AdminMainComponents/AdminDetails';
import OnwersDetails from './AdminMainComponents/OnwersDetails';
import EventDetails from './AdminMainComponents/EventDetails';
import GalleryPoser from './AdminMainComponents/GalleryPoster';
import GalleryPhotos from './AdminMainComponents/GalleryPhotos';
import ContactMessages from './AdminMainComponents/ContactMessages';
import PageContentDetails from './AdminMainComponents/PageContentDetails';


function AdminMain() {
  return (
    <div>
        <Routes>
          <Route path='/userList' element={<UserList />} />
          <Route path='/adminDetails' element={<AdminDetails />} />
          <Route path='/ownerDetails' element={<OnwersDetails />} />
          <Route path='/eventDetails' element={<EventDetails />} />
          <Route path='/contact' element={<ContactMessages />} />
          <Route path='/mainPoster' element={<GalleryPoser />} />
          <Route path='/galleryPhotos' element={<GalleryPhotos />} />
          <Route path='/contents' element={<PageContentDetails />} />

        </Routes>         
    </div>
  )
}

export default AdminMain