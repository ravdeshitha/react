import React from 'react'
import AlbumAddForm from './AlbumAddForm'

function GalleryPhotos() {
    return (
        <div className='w-full h-[90vh]'>
            <div className='pl-6 pr-6 pt-6 pb-2 text-3xl text-slate-800'>
                <h2 className='ml-10 font-semibold text-slate-600'>Gallery</h2>
                <hr className='h-[2px] border-slate-300 mt-6'/>
    
            </div>
            <div>
                <AlbumAddForm />
            </div>
        </div>
      )
}

export default GalleryPhotos