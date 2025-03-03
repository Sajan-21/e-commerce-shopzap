import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import GetUser from '../components/functional-components/GetUser'
import { useParams, NavLink } from 'react-router-dom'
import Sidebar from '../components/ui-components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLocationDot, faMapPin, faPhone } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

  const params = useParams();
  const token = localStorage.getItem(params.authId);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async function () {
      try {
        let response = await GetUser(token, params.authId);
        setUser(response);
      } catch (error) {
        console.log("error in fetchUser : ", error);

      }
    }
    fetchUser();
  }, [token, params.authId]);


  return (
    <div>
      <Navbar />
      <div className='flex gap-5'>
        <div className='flex-none shadow-2xl'>
          <Sidebar />
        </div>
        <div className='grow shadow-2xl sm:p-5'>
          <div className='flex justify-between p-5 max-md:flex-col gap-5'>
            <div className='flex gap-3 items-start'>
              <div>
                <p className='border-4 border-red-50 rounded-full px-5 py-2 bg-green-100 text-2xl font-bold capitalize' >{user.name?.split('')[0]}</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className='space-y-3'>
              <h1 className='font-bold text-xl border-b border-slate-300'>Address</h1>
              <div className='grid sm:grid-cols-2 grid-cols-1 space-y-2' >
                <p className='flex items-center gap-2'> <FontAwesomeIcon icon={faHome} /> {user.houseName || "house name not added"}</p>
                <p className='flex items-center gap-2'> <FontAwesomeIcon icon={faLocationDot} /> {user.postalArea || "postal area not added"}</p>
                <p className='flex items-center gap-2'> <FontAwesomeIcon icon={faPhone} /> {user.phone || "phone number not added"}</p>
                <p className='flex items-center gap-2'> <FontAwesomeIcon icon={faMapPin} /> {user.pinCode || "pincode not added"}</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-center gap-5 p-5'>
            <NavLink to={`/wish-list/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.wishList?.length || 0)} Wish list Items
            </NavLink>
            <NavLink to={`/cart/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.cartList?.length || 0)} Cart Items
            </NavLink>
            <NavLink to={`/my-orders/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.orders?.length || 0)} Orders
            </NavLink>
            <NavLink className="p-5 bg-red-50">
              Profit of {user.profit || "0"} rupees
            </NavLink>
            <NavLink to={`/my-products/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.orders?.length || 0)} Orders
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile