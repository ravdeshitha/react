import React, { useEffect, useState } from 'react';
import bakery from '../assets/bakery.png';
import gimanhala from '../assets/rest.png';
import reception from '../assets/hall.png';
import service from '../assets/service.png';
import builders from '../assets/build.png';
import './GalleryNavigation.css';

function GalleryNavigation({setAlbumCategory}) {
  const [activeItem, setActiveItem] = useState('bakery');


  const handleClick = (itemName) => {
    setActiveItem(itemName);
    setAlbumCategory(itemName);
  };

  return (
    <div className='navigation w-[97%] m-auto px-10 flex relative border-b-2 border-slate-600/50'>
      <ul className='flex w-full'>
        <li className={`list ${activeItem === 'bakery' ? 'active' : ''}`}>
          <a href='#' onClick={() => handleClick('bakery')}>
            <span><img className='galleryIcon' src={bakery} alt='Bakery' /></span>
            <span className='text'>Wasana Bakers</span>
          </a>
        </li>
        <li className={`list ${activeItem === 'gimanhala' ? 'active' : ''}`}>
          <a href='#' onClick={() => handleClick('gimanhala')}>
            <span><img className='galleryIcon' src={gimanhala} alt='Gimanhala' /></span>
            <span className='text'>Wasana Gimanhala</span>
          </a>
        </li>
        <li className={`list ${activeItem === 'reception' ? 'active' : ''}`}>
          <a href='#' onClick={() => handleClick('reception')}>
            <span><img className='galleryIcon' src={reception} alt='Reception Hall' /></span>
            <span className='text'>Reception Hall</span>
          </a>
        </li>
        <li className={`list ${activeItem === 'clean' ? 'active' : ''}`}>
          <a href='#' onClick={() => handleClick('clean')}>
            <span><img className='galleryIcon' src={service} alt='Clean & Care' /></span>
            <span className='text'>Clean & Care</span>
          </a>
        </li>
        <li className={`list ${activeItem === 'builders' ? 'active' : ''}`}>
          <a href='#' onClick={() => handleClick('builders')}>
            <span><img className='galleryIcon' src={builders} alt='Builders & Engineers' /></span>
            <span className='text'>Builders & Engineers</span>
          </a>
        </li>
        <div className='indicator'></div>
      </ul>
    </div>
  );
}

export default GalleryNavigation;
