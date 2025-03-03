import { faAdd, faAddressCard, faBagShopping, faCartFlatbedSuitcase, faChevronCircleDown, faChevronCircleLeft, faChevronCircleRight, faUserCircle, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const menuItems = [
  {
    icons: <FontAwesomeIcon icon={faAddressCard} size={30} />,
    label: 'Profile',
    to: '/profile'
  },
  {
    icons: <FontAwesomeIcon icon={faUserPen} size={30} />,
    label: 'Update Profile',
    to: '/update-profile'
  },
  {
    icons: <FontAwesomeIcon icon={faBagShopping} size={30} />,
    label: 'My Orders',
    to: '/my-orders'
  },
  {
    icons: <FontAwesomeIcon icon={faCartFlatbedSuitcase} size={30} />,
    label: 'My Products',
    to: '/my-products'
  },
  {
    icons: <FontAwesomeIcon icon={faAdd} size={30} />,
    label: 'Add Product',
    to: '/add-product'
  },
]

export default function Sidebar() {

  const [open, setOpen] = useState(false);
  const params = useParams();

  return (
    <nav className={` shadow-md h-full sm:pe-5 sm:pb-5 flex flex-col duration-500 bg-white text-black sm:w-60 ${open ? 'w-60' : 'w-16'}`}>

      <div className=' p-3 flex justify-start items-center'>
        <div className='sm:hidden'><FontAwesomeIcon icon={faChevronCircleLeft} size={34} className={` duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} /></div>
      </div>

      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <NavLink key={index} to={`${item.to}/${params.role}/${params.authId}`} className={({ isActive }) => `${isActive ? "bg-red-50 flex items-center gap-3 hover:bg-red-50 p-3 px-5" : "flex items-center gap-3 hover:bg-red-50 p-3 px-5"}`}  >
                <p > {item.icons}</p>
                <p
                  className={`${params.role !== "vendor" && (item.label === "My Products" || item.label === "Add Product")
                      ? "hidden"
                      : `${!open ? 'max-sm:hidden' : 'block'} duration-500 overflow-hidden`
                    }`}
                >
                  {item.label}
                </p>
              </NavLink>
            )
          })
        }
      </ul>
      
    </nav>
  )
}