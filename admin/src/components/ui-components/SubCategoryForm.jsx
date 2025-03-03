import React, { useEffect, useState } from 'react'
import GetCategories from '../functional-components/GetCategories';
import axios from 'axios';
import { backendURL } from '../../config/Config';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const SubCategoryForm = () => {

  const {adminEmail} = useParams();
  const token = localStorage.getItem(adminEmail);

  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        let response = await GetCategories();
        setCategories(response);
      } catch (error) {
        console.log("error in fetchCategories : ",error);
      }
    }
    fetchCategories();
  },[]);

  const handleAddSubCategory = async(e) => {
    e.preventDefault();
    try {
      if(selected == "") {
        return toast.error("select a category !!!");
      }
      let response = await axios({
        method: "POST",
        url: `${backendURL}/add-sub-category`,
        headers: { Authorization: `Bearer ${token}`},
        data: {
          category_id: selected,
          subCategory,
        }
      });
      if(response.data.success == true) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2600);
      }
    } catch (error) {
      console.log("error in handleAddSubCategory : ",error);
      toast.error(error.response.data.message);
    }
  }
  

  return (
    <div className='border border-slate-200 bg-blue-50 p-10 max-sm:p-3 rounded-2xl flex justify-center shadow-2xl'>
        <form className='flex flex-col gap-3 w-1/2 max-sm:w-full' onSubmit={handleAddSubCategory}>
        <label htmlFor="selectbox">Select Category</label>
            <select className='bg-white border border-slate-400 rounded p-2 outline-0' defaultValue="" onChange={(e) => setSelected(e.target.value)} >
              <option disabled value="" >--select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item._id}>{item.category}</option>
              ))}
            </select>
            <label htmlFor="category" className=''>Sub Category</label>
            <input type="text" className='w-full outline-0 border border-slate-400 rounded px-2 py-1 bg-white' onChange={(e) => setSubCategory(e.target.value)} />
            <button type="submit" className='w-1/3 max-sm:w-full px-3 py-2 border border-slate-400 rounded bg-green-100 hover:bg-green-950 hover:text-white'>Add</button>
        </form>
    </div>
  )
}

export default SubCategoryForm