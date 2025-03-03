import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between mb-5 text-3xl'>
        <div className='flex items-end gap-2 p-3 sm:px-10 bg-white shadow-2xl rounded-e-full'>
            <h1>shopZap</h1>
        </div>
        <div className='p-3 bg-white shadow-2xl rounded-s-full'>
            <FontAwesomeIcon icon={faUserCircle} />
        </div>
    </div>
  )
}

export default Navbar