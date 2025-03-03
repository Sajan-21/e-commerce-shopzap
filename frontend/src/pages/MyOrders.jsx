import React from 'react'
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import ProfileSidebar from '../components/ui-components/Sidebar'

const MyOrders = () => {
  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='flex-none shadow-2xl'>
            <ProfileSidebar />
            </div>
            <div className='grow shadow-2xl'></div>
        </div>
        <Footer />
    </div>
  )
}

export default MyOrders