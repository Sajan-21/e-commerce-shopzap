import React, { useState } from 'react'
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import {  useParams } from 'react-router-dom'
import axios from 'axios'
import {backendURL} from '../config/Config'

const VendorRegistration = () => {

    const params = useParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [brand, setBrand] = useState('');

    let token = localStorage.getItem(params.authId);

    async function handleVendorRegistration(e) {
        e.preventDefault();
        try {
            let response = await axios({
                method: 'POST',
                url: `${backendURL}/vendor-registration`,
                headerseaders: {Authorization: `Bearer ${token}`},
                data: {
                    email,
                    password,
                    brand
                }
            });
            console.log("response : ",response);
            
        } catch (error) {
            console.log("error in handleVendorRegistration : ",error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='py-10 flex items-center justify-center vendor-registration-bg-img bg-cover bg-no-repeat text-white'>
                <div className='backdrop-blur-xl p-10 sm:px-20 md:w-1/2 max-sm:w-full rounded-xl shadow-2xl space-y-10'>
                    <p className='text-2xl text-center'>Become a vendor</p>
                    <form className='flex flex-col gap-5' onClick={handleVendorRegistration}>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Brand name</label>
                            <input type="text" className='border outline-0 p-2'
                                placeholder='Enter your brand / company name'
                                onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input type="email" className='border outline-0 p-2'
                                placeholder='Enter your shopZap login email'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className='border outline-0 p-2'
                                placeholder='Enter your shopZap password'
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='text-center'>
                            <input type="submit" value="submit" className='w-1/2 hover:text-white hover:bg-indigo-400 px-3 py-2 border text-white hover:border-white hover:font-bold' />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VendorRegistration