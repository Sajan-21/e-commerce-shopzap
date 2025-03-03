import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL } from '../config/Config';
import { toast } from 'react-toastify'

export default function Login() {

    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleAdminLogin(e) {
    e.preventDefault();
    try {

      let response = await axios({
        method: "POST",
        url: `${backendURL}/admin-login`,
        data: {
          email,
          password
        }
      });
      if (response.data.success == true) {
        localStorage.setItem(response.data.data.email, response.data.data.token);
        toast.success(response.data.message);
        navigate(`/dashboard/${response.data.data.email}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in handleLogin : ", error);
    }
  }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold">shopZap</h1>
            <p>admin panel</p>
        </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-xl pb-5">welcome back!</h1>
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  