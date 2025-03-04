import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const params = useParams();

  function handleLogOut() {
    try {
      console.log("logut");
      
      localStorage.removeItem(params.authId);
      navigate('/');

    } catch (error) {
      console.log("error in handleLogOut : ",error);
      
    }
  }

  return (
    <div className='flex justify-between mb-5 text-3xl'>
        <div className='flex items-end gap-2 p-3 sm:px-10 bg-white shadow-2xl rounded-e-full'>
            <h1>shopZap</h1>
        </div>
        <div className='p-3 bg-white shadow-2xl rounded-s-full text-sm flex justify-center items-center'>
          <button className='border rounded-full px-2 py-1 bg-gray-500 text-white hover:bg-gray-800' onClick={handleLogOut} >Log Out</button>
        </div>
    </div>
  )
}

export default Navbar