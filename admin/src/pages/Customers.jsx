import React from 'react'
import Sidebar from '../components/ui-components/Sidebar'

const Customers = () => {
  return (
    <div className='flex gap-5'>
        <div className='flex-none shadow-2xl'>
            <Sidebar />
        </div>
        <div className='grow shadow-2xl bg-white p-5'>
        </div>
    </div>
  )
}

export default Customers