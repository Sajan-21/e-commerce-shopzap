import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faChartPie, faClock, faFilter, faPersonDotsFromLine, faUsers, } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useParams } from 'react-router-dom'

const navLinks = [
  {
    label: "Dashboard",
    icon: faChartPie,
    to: "/dashboard"
  },
  {
    label: "Orders",
    icon: faClock,
    to: "/orders"
  },
  {
    label: "Products",
    icon: faBagShopping,
    to: "/products"
  },
  {
    label: "Customers",
    icon: faUsers,
    to: "/customers"
  },
  {
    label: "Vnedors",
    icon: faPersonDotsFromLine,
    to: "/vendors"
  },
  {
    label: "Categories",
    icon: faFilter,
    to: "/categories"
  },
]

const Sidebar = () => {

  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`h-full flex flex-col py-5 items-start gap-3 duration-500 bg-white sm:w-50 ${isOpen ? "w-50 pe-5" : ""}`}>
      <div className='sm:hidden'>
      <FontAwesomeIcon icon={faBars} className='px-5 py-3 duration-500' onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} />
      </div>

      <div className='w-full flex flex-col gap-3'>
        {navLinks.map((item, index) => (
          <NavLink
            key={index}
            to={`${item.to}/${params.adminEmail}`}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-3 px-5 hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
            }
          >
            <FontAwesomeIcon icon={item.icon} title={item.label} />
            <p className={`${!isOpen ? "max-sm:hidden" : "duration-500"}`}>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar