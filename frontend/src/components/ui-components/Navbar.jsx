import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser, faBars, faCross, faX } from "@fortawesome/free-solid-svg-icons";
import CheckLogin from '../functional-components/CheckLogin';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Navbar = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const response = await CheckLogin(params);
            setIsLoggedIn(response);
        };
        checkAuthentication();
    }, [params]);
    console.log("isLoggedIn : ", isLoggedIn);


    const handleLogOut = () => {
        try {
            localStorage.removeItem(params.authId);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log("Error in handleLogOut:", error);
        }
    };

    return (
        <div className='mb-5'>
            <div className='flex justify-between items-center p-3 px-5 bg-red-50 shadow-lg'>
                <div className='flex items-center gap-3 w-full'>
                    <div className='sm:hidden'>
                        <FontAwesomeIcon icon={faBars} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} />
                    </div>
                    <p>shopZap</p>
                </div>
                <ul className='flex items-center justify-center gap-10 max-sm:hidden w-full' >
                    <li> <NavLink to={isLoggedIn ? `/${params.role}/${params.authId}` : "/"} className={({ isActive }) => `${isActive ? "text-black" : "text-gray-600 hover:text-black"}`} >HOME</NavLink> </li>
                    <li> <NavLink to={isLoggedIn ? `/collections/${params.role}/${params.authId}` : "/collections"} className={({ isActive }) => `${isActive ? "text-black" : "text-gray-600 hover:text-black"}`} >COLLECTIONS</NavLink> </li>
                    <li> <NavLink to={isLoggedIn ? `/about/${params.role}/${params.authId}` : "/about"} className={({ isActive }) => `${isActive ? "text-black" : "text-gray-600 hover:text-black"}`} >ABOUT</NavLink> </li>
                </ul>
                <ul className='flex items-center justify-end gap-10 w-full'>
                    <li className={isLoggedIn ? "" : "hidden"}> <NavLink to={`/cart/${params.role}/${params.authId}`}><FontAwesomeIcon icon={faHeart} /></NavLink> </li>
                    <li className={isLoggedIn ? "" : "hidden"}> <NavLink to={`/wish-list/${params.role}/${params.authId}`}><FontAwesomeIcon icon={faCartShopping} /></NavLink> </li>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex justify-center text-sm font-semibold text-gray-900">
                                <FontAwesomeIcon icon={faUser} />
                            </MenuButton>
                            <MenuItems
                                className="absolute right-0 z-10 mt-2 w-56 bg-white ring-1 shadow-lg ring-black/5 rounded-md"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <NavLink
                                            to={`/profile/${params.role}/${params.authId}`}
                                            className={isLoggedIn ? "block px-4 py-2 text-sm text-gray-700" : "hidden"}
                                        >
                                            Profile
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink
                                            to={`/vendor-registration/${params.authId}`}
                                            className={isLoggedIn && params.role == "customer" ? "block px-4 py-2 text-sm text-gray-700" : "hidden"}
                                        >
                                            Become a vendor
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink
                                            to="#"
                                            onClick={handleLogOut}
                                            className={isLoggedIn ? "block px-4 py-2 text-sm text-gray-700" : "hidden"}
                                        >
                                            Log out
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink
                                            to="/login"
                                            className={!isLoggedIn ? "block px-4 py-2 text-sm text-gray-700" : "hidden"}
                                        >
                                            Login / Sign up
                                        </NavLink>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </li>
                </ul>
            </div>
            <div className={`fixed z-10 left-0 top-0 ${isOpen ? "w-60" : "hidden"}`}>

                <div className='flex flex-col justify-between items-center p-3 px-5 bg-red-50 shadow-lg'>
                    <div className='flex items-center gap-3 w-full'>
                        <div className='sm:hidden'>
                            <FontAwesomeIcon icon={faX} onClick={() => setIsOpen(false)} />
                        </div>
                        <p>shopZap</p>
                    </div>
                    <ul className='flex flex-col gap-3 p-5 w-full h-screen' >
                        <li> <NavLink to={isLoggedIn ? `/${params.role}/${params.authId}` : "/"} className={({ isActive }) => `${isActive ? "font-bold" : "text-gray-600"}`} >HOME</NavLink> </li>
                        <li> <NavLink to={isLoggedIn ? `/collections/${params.role}/${params.authId}` : "/collections"} className={({ isActive }) => `${isActive ? "font-bold" : "text-gray-600"}`} >COLLECTIONS</NavLink> </li>
                        <li> <NavLink to={isLoggedIn ? `/about/${params.role}/${params.authId}` : "/about"} className={({ isActive }) => `${isActive ? "font-bold" : "text-gray-600"}`} >ABOUT</NavLink> </li>
                    <li className={isLoggedIn ? "" : "hidden"}> <NavLink to={`/cart/${params.role}/${params.authId}`} className={({ isActive }) => `${isActive ? "font-bold" : "text-gray-600"}`} > WISHLIST</NavLink> </li>
                    <li className={isLoggedIn ? "" : "hidden"}> <NavLink to={`/wish-list/${params.role}/${params.authId}`} className={({ isActive }) => `${isActive ? "font-bold" : "text-gray-600"}`} > CART</NavLink> </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
