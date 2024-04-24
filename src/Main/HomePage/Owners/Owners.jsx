import React, { useEffect, useState } from 'react';
import './Owners.css';
import axios from 'axios';

function Owners({ title, body }) {
  const [directors, setDirectors] = useState([]);
  const [founder, setFounder] = useState([]);
  const [ceo, setCeo] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER}/api/mainHome/owners`)
      .then(res => {
        const owners = res.data.result;
        setFounder(owners.filter(item => item.ownerType === 'founder' || item.ownerType === 'Founder'));
        setCeo(owners.filter(item => item.ownerType === 'ceo' || item.ownerType === 'CEO'));
        setDirectors(owners.filter(item => item.ownerType !== 'founder' && item.ownerType !== 'Founder' && item.ownerType !== 'ceo' && item.ownerType !== 'CEO'));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='Owners pt-[10vh]'>
      <div className='page-title'>Our Team</div>

      <div className='ceoFounder flex gap-10 justify-center'>
        {founder.map((owner, index) => (
          <div key={index} className='card-container'>
            <div className="image-container">
              <img src={import.meta.env.VITE_LOCAL_IMG_PATH + owner.ownerImage} alt="" />
            </div>
            <div className="card-title">{owner.ownerName}</div>
            <div className='card-position'>Founder</div>
          </div>
        ))}

        {ceo.map((owner, index) => (
          <div key={index} className='card-container'>
            <div className="image-container">
              <img src={import.meta.env.VITE_LOCAL_IMG_PATH + owner.ownerImage} alt="" />
            </div>
            <div className="card-title">{owner.ownerName}</div>
            <div className='card-position'>Founder</div>
          </div>
        ))}

      </div>

      {/* <div className='board-title'>Board Of Directors</div> */}

      <div className='anim-container'>
        <div className='anim'>
          <div className='directors'>
            {directors.map((owner, index) => (
              <div key={index} className='card-container'>
                <div className="image-container">
                  <img src={import.meta.env.VITE_LOCAL_IMG_PATH + owner.ownerImage} alt="" />
                </div>
                <div className="card-title">{owner.ownerName}</div>
                <div className='card-position'>{owner.ownerType}</div>
              </div>
            ))}
          </div>
          <div className='directors'>
            {directors.map((owner, index) => (
              <div key={index} className='card-container'>
                <div className="image-container">
                  <img src={import.meta.env.VITE_LOCAL_IMG_PATH + owner.ownerImage} alt="" />
                </div>
                <div className="card-title">{owner.ownerName}</div>
                <div className='card-position'>{owner.ownerType}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Owners;
