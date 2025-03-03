import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui-components/Navbar'
import Footer from '../components/ui-components/Footer'
import ProfileSidebar from '../components/ui-components/Sidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { backendURL } from '../config/Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee, faPen, faPenAlt, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons'

const MyProducts = () => {

  const params = useParams();
  const token = localStorage.getItem(params.authId);

  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async() => {
      try {
        let response = await axios({
          method: "GET",
          url: `${backendURL}/vendor-product/${params.authId}`,
          headers: { Authorization: `Bearer ${token}`},
        });
        setMyProducts(response.data.data);
        
      } catch (error) {
        console.log("error in fetchMyProducts : ",error);
        
      }
    }
    fetchMyProducts()
  }, [token, params.authId]);
  console.log(myProducts);
  

  return (
    <div>
        <Navbar />
        <div className='flex gap-5'>
            <div className='flex-none shadow-2xl'>
            <ProfileSidebar />
            </div>
            <div className='grow shadow-2xl p-5'>
              <div className='space-y-5'>
                <h1>My Products</h1>
                <div className=''>
                </div>
              </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default MyProducts