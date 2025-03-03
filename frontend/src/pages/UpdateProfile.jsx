import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import ProfileSidebar from '../components/ui-components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import GetUser from '../components/functional-components/GetUser'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendURL } from '../config/Config'

const UpdateProfile = () => {

  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem(params.authId);

  const [user, setUser] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [houseName, setHouseName] = useState('');
  const [postalArea, setPostalArea] = useState('');
  const [pinCode, setPinCode] = useState(0);
  const [phone, setPhone] = useState(0);

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

  const handleUpdateUser = async function(e) {
    try {
      e.preventDefault();

      let response = await axios({
        method: "PATCH",
        url: `${backendURL}/update-user/${params.authId}`,
        headers: {Authorization: `Bearer ${token}`},
        data: {
          name: name || user.name,
          email: email || user.email,
          houseName: houseName || user.houseName,
          postalArea: postalArea || user.postalArea,
          pinCode: pinCode || user.pinCode,
          phone: phone || user.phone,
        }
      });
      console.log("response : ",response);
      if(response.data.success == true){
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
      }, 2000);
      }else{
        toast.error(response.data.message);
        setTimeout(() => {
          window.location.reload();
      }, 2000);
      }
    } catch (error) {
      console.log("error in UpdateUser : ",error);
      
    }
  }
  

  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='flex-none shadow-2xl'>
            <ProfileSidebar />
            </div>
            <div className='grow shadow-2xl sm:p-5 max-sm:p-3 space-y-5'>
              <div>
                <h1 className='text-2xl font-bold'>Update your profile</h1>
                <p>Only filled fields will be update. other fields won't update</p>
              </div>
              <form className='space-y-5 sm:w-3/4' onSubmit={handleUpdateUser}>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">Name</label>
                  <input type="text" className='border outeline-0 px-3 py-2' onChange={(e) => setName(e.target.value)} placeholder={`${user.name}`} />
                </div>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">Email</label>
                  <input type="text" className='border outeline-0 px-3 py-2' onChange={(e) => setEmail(e.target.value)} placeholder={`${user.email}`} />
                </div>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">House name / Building name</label>
                  <input type="text" className='border outeline-0 px-3 py-2' onChange={(e) => setHouseName(e.target.value)} placeholder={`${user.houseName || "Enter your House name / Building name"}`} />
                </div>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">Postal area</label>
                  <input type="text" className='border outeline-0 px-3 py-2' onChange={(e) => setPostalArea(e.target.value)} placeholder={`${user.postalArea || "Enter your postal area"}`} />
                </div>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">Pincode</label>
                  <input type="number" className='border outeline-0 px-3 py-2' onChange={(e) => setPinCode(e.target.value)} placeholder={`${user.pinCode || "Enter 6 digit pincode"}`} />
                </div>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="name">Phone number</label>
                  <input type="number" className='border outeline-0 px-3 py-2' onChange={(e) => setPhone(e.target.value)} placeholder={`${user.phone || "Enter 10 digit phone number"}`} />
                </div>
                <div>
                  <input type="submit" value="update" className='border px-3 py-2 hover:bg-red-50 hover:font-bold' />
                </div>
              </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default UpdateProfile