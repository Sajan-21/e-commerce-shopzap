import React, { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../../config/Config'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const CategoryForm = () => {

    const {adminEmail} = useParams();
    const token = localStorage.getItem(adminEmail);

    const [category, setCategory] = useState('');

    async function handleAddCategory(e) {
        e.preventDefault();
        try {
            let response = await axios({
                method: "POST",
                url: `${backendURL}/add-category`,
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    category
                }
            });
            
            if(response.data.success == true){
                toast.success(response.data.message);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error in handleAddCategory : ",error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='border border-slate-200 bg-blue-50 p-10 max-sm:p-3 rounded-2xl flex justify-center shadow-2xl'>
        <form className='flex flex-col gap-3 w-1/2 max-sm:w-full' onSubmit={handleAddCategory}>
            <label htmlFor="category" className=''>Category</label>
            <input type="text" className='w-full outline-0 border border-slate-400 rounded px-2 py-1 bg-white' onChange={(e) => setCategory(e.target.value)} />
            <button type="submit" className='w-1/3 max-sm:w-full px-3 py-2 border border-slate-400 rounded bg-green-100 hover:bg-green-950 hover:text-white'>Add</button>
        </form>
    </div>
  )
}

export default CategoryForm