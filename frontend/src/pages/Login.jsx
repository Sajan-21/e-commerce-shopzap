import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL } from '../config/Config';
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {

      let response = await axios({
        method: "POST",
        url: `${backendURL}/login`,
        data: {
          email,
          password
        }
      });
      if (response.data.success == true) {
        localStorage.setItem(response.data.data.authId, response.data.data.token);
        navigate(`/${response.data.data.role}/${response.data.data.authId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in handleLogin : ", error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='py-10 flex items-center justify-center sign-up-login-bg-img bg-cover bg-no-repeat'>
        <div className='backdrop-blur-xl p-10 sm:px-20 md:w-1/2 max-sm:w-full rounded-xl shadow-2xl space-y-10'>
          <p className='text-center text-2xl'>Welcome back</p>
          <form className='flex flex-col gap-5' onSubmit={handleLogin}>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input type="email" className='border outline-0 p-2'
                placeholder='example@gmail.com'
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>
              <input type="password" className='border outline-0 p-2'
                placeholder='please provide a strong password'
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='text-center'>
              <input type="submit" value="login" className='w-1/2 hover:text-black hover:bg-white px-3 py-2 border text-black hover:border-black hover:font-bold' />
            </div>
          </form>
          <div className='flex items-center justify-center'>
            <p>Don't have an account ?</p>
            <Link to='/sign-up' className=' px-3 py-2 hover:text-indigo-800' >Sign up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login