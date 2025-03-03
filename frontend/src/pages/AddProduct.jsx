import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui-components/Navbar'
import Sidebar from '../components/ui-components/Sidebar'
import Footer from '../components/ui-components/Footer'
import uploadImage from '../assets/uploadImage.jpeg'
import GetCategories from '../components/functional-components/GetCategories'
import GetSubCategories from '../components/functional-components/GetSubCategories'
import { useNavigate, useParams } from 'react-router-dom'
import { backendURL } from '../config/Config'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddProduct = () => {

  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem(params.authId);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let response = await GetCategories();
        setCategories(response);
      } catch (error) {
        console.log("error in fetchCategories : ", error);
      }
    }
    fetchCategories();
  }, []);

  async function handleSelectedCategory(categoryId) {
    try {
      setCategory(categoryId);
      let response = await GetSubCategories(categoryId, token);
      setSubCategories(response);
    } catch (error) {
      console.log("error in handleSelectedCategory : ", error);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    try {

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {

            let formData = new FormData();

            console.log("subCategory : ", subCategory)

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);
            formData.append("name", name);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);

            let response = await axios({
              method: "POST",
              url: `${backendURL}/add-product/${params.authId}`,
              headers: { Authorization: `Bearer ${token}` },
              data: formData
            });

            resolve(response.data.message);
            navigate(`/my-products/${params.role}/${params.authId}`);
          
          } catch (error) {
            reject(error.message);
          }
        }),
        {
          pending: "Adding product...",
          success: "Product added successfully! 🎉",
          error: "Failed to add product ❌",
        }
      );

    } catch (error) {
      console.log("error in handleAddProduct : ", error);
    }
  }


  return (
    <div>
      <Navbar />
      <div className='flex gap-5'>
        <div className='flex-none shadow-2xl'>
          <Sidebar />
        </div>
        <div className='grow shadow-2xl sm:p-5 max-sm:p-4'>
          <div className='space-y-5'>

            <div>
              <h1>Add Product</h1>
              <p>add your products details here and submit.</p>
            </div>

            <form className='space-y-5' onSubmit={handleAddProduct}>

              <div className='flex flex-col gap-2'>
                <p>Upload Images</p>
                <div className='flex flex-wrap gap-5 '>
                  <label htmlFor='image1' className='border border-slate-300 rounded-lg'>
                    <img src={image1 ? URL.createObjectURL(image1) : uploadImage} alt="" className='size-24 rounded-lg' />
                    <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
                  </label>
                  <label htmlFor='image2' className='border border-slate-300 rounded-lg'>
                    <img src={image2 ? URL.createObjectURL(image2) : uploadImage} alt="" className='size-24 rounded-lg' />
                    <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
                  </label>
                  <label htmlFor='image3' className='border border-slate-300 rounded-lg'>
                    <img src={image3 ? URL.createObjectURL(image3) : uploadImage} alt="" className='size-24 rounded-lg' />
                    <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
                  </label>
                  <label htmlFor='image4' className='border border-slate-300 rounded-lg'>
                    <img src={image4 ? URL.createObjectURL(image4) : uploadImage} alt="" className='size-24 rounded-lg' />
                    <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
                  </label>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Product Name</label>
                <input type="text" className='border rounded p-2 outline-0 sm:w-3/4 md:w-1/2 border-slate-400' required onChange={(e) => setName(e.target.value)} />
              </div>

              <div className='flex max-sm:flex-col w-full gap-5'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="category">Product Category</label>
                  <select className='border rounded p-2 outline-0 border-slate-400' defaultValue="" required onChange={(e) => handleSelectedCategory(e.target.value)} >
                    <option value="" disabled>--select category--</option>
                    {categories.map((item) => (
                      <option value={item._id} key={item._id}>{item.category}</option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="category" className='flex gap-2 items-start'>Product Sub category <p className={category ? "hidden" : "text-sm text-red-700"}>select category first *</p> </label>
                  <select className='border rounded p-2 outline-0 border-slate-400' required onChange={(e) => setSubCategory(e.target.value)} defaultValue="" >
                    <option value="" disabled>--select subcategory--</option>
                    {subCategories?.map((item) => (
                      <option value={item._id} key={item._id}>{item.subCategory}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="description">Product Description</label>
                <textarea name="description" className='border rounded w-full h-40 p-2 outline-0 border-slate-400' required onChange={(e) => setDescription(e.target.value)} ></textarea>
              </div>

              <div className='flex max-sm:flex-col w-full gap-5'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="Price">Product Price</label>
                  <input type="Number" className='border rounded p-2 outline-0 border-slate-400' required onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="Price">number of stotck</label>
                  <input type="Number" className='border rounded p-2 outline-0 border-slate-400' required onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>

              <div>
                <button type="submit" className='border px-3 py-2 rounded border-slate-400 bg-blue-100 hover:bg-blue-950 hover:text-white ' >Add Product</button>
              </div>

            </form>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AddProduct