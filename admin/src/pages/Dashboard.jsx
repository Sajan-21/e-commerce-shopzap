import React from 'react'
import Sidebar from '../components/ui-components/Sidebar'
import Navbar from '../components/ui-components/Navbar'

const Dashboard = () => {
  return (
    <div className='flex gap-5'>
      <div className='flex-none shadow-2xl'>
        <Sidebar />
      </div>
      <div className='grow'>
        <Navbar />
        <div className=' shadow-2xl bg-white p-5'>
          <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>12 Orders</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>345 Products</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>4500 Customers</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>30 Vendors</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>15 Categories</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>46 Sub Categories</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>3 Banned Users</li>
            <li className={`border p-5 rounded bg-blue-100 font-bold text-xl`}>3 Banned Products</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard