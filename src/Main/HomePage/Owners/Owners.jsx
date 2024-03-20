import React, { useEffect, useState } from 'react';
import './Owners.css';
import axios from 'axios';

function Owners({ title, body }) {
  const [directors, setDirectors] = useState([]);
  const [founder, setFounder] = useState([]);
  const [ceo, setCeo] = useState([]);

  useEffect(() => {
    axios.get('https://test-repo-2xuo.onrender.com/api/mainHome/owners')
      .then(res => {
        const owners = res.data.result;
        setFounder(owners.filter(item => item.ownerType === 'founder'));
        setCeo(owners.filter(item => item.ownerType === 'ceo'));
        setDirectors(owners.filter(item => item.ownerType !== 'founder' && item.ownerType !== 'ceo'));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='Owners'>
      <div className='page-title'>Our Team</div>

      <div className='ceoFounder flex gap-10 justify-center'>
        {founder.map((owner, index) => (
          <div key={index} className='card-container'>
            <div className="image-container">
              <img src={'https://test-repo-2xuo.onrender.com/images/' + owner.ownerImage} alt="" />
            </div>
            <div className="card-title">{owner.ownerName}</div>
            <div className='card-position'>Founder</div>
          </div>
        ))}

        {ceo.map((owner, index) => (
          <div key={index} className='card-container'>
            <div className="image-container">
              <img src={'https://test-repo-2xuo.onrender.com/images/' + owner.ownerImage} alt="" />
            </div>
            <div className="card-title">{owner.ownerName}</div>
            <div className='card-position'>Founder</div>
          </div>
        ))}

      </div>

      <div className='board-title'>Board Of Directors</div>

      <div className='anim-container'>
        <div className='anim'>
          <div className='directors flex gap-10 justify-center'>
            {directors.map((owner, index) => (
              <div key={index} className='card-container'>
                <div className="image-container">
                  <img src={'https://test-repo-2xuo.onrender.com/images/' + owner.ownerImage} alt="" />
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
