import React, { useState,useRef } from 'react'
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const onChooseFile = () => {
        inputRef.current.click
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

  return (
    <div className='flex flex-col items-center'>
        <div className='relative mb-4'>
            <div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center  overflow-hidden cursor-pointer
            border-2 border-gray-300 hover:border-blue-500 transition-all'>
                {previewUrl ? <img src={previewUrl} alt='profile pic' className='w-full h-fufll object-cover' /> :
                 <FaCamera className='text-3xl text-gray-400' />
}
            </div>

            {!image ? (<button className='absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full
             hover:bg-blue-600 transition-colors' onClick={onChooseFile} >
                 <FaCamera className='text-sm' />
             </button>) 
            
            : ( <button type='button' className=' absolute -bottom-2 -right-2 bg-blue-500 text0-white 
            p-2 rounded-full hover:bg-blue-600 transition-colors' onClick={handleRemoveImage} >

              <MdDelete />

            </button>)}
        </div>
    </div>
  )
}

export default ProfilePhotoSelector


