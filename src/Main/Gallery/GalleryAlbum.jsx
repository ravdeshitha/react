import React from 'react';

import image1 from './assets/01.jpg';
import image2 from './assets/02.jpg';
import image3 from './assets/03.jpg';
import image4 from './assets/04.jpg';
import image5 from './assets/05.jpg';
import image6 from './assets/06.jpg';
import image7 from './assets/07.jpg';
import image8 from './assets/08.jpg';



const imageArr = [image1, image2, image3,image4,image5,image6,image7,image8, image1];

function GalleryAlbum()
{
    return(

        

        <div class="p-5 md:p-10">

            <div className="text-4xl font-bold m-2">
                Album 1
            </div>
            <div class="columns-2 gap-3 lg:gap-3 sm:columns-3 lg:columns-5 md:columns-4 xl:columns-6 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8 ">
             
                
            {imageArr.map((image, index) => (
                <div key={index}>
                    <img class="pb-3" src={image} alt={`Image ${index + 1}`} />
                </div>
                ))}
                
                
            </div>
        </div>
        
    );
}

export default GalleryAlbum;