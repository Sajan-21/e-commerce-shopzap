import React, { useEffect, useState } from 'react'
import Sidebar from '../components/ui-components/Sidebar'
import Navbar from '../components/ui-components/Navbar'
import CategoryForm from '../components/ui-components/CategoryForm'
import SubCategoryForm from '../components/ui-components/SubCategoryForm'
import GetCategories from '../components/functional-components/GetCategories'

const Categories = () => {

  const [showCF, setShowCF] = useState(false);
  const [showSCF, setShowSCF] = useState(false);

  const [categories, setCategories] = useState([]);

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

  return (
    <div className='flex gap-5'>
      <div className='flex-none shadow-2xl'>
        <Sidebar />
      </div>
      <div className='grow'>
        <Navbar />
        <div className=' shadow-2xl bg-white p-5'>
          <div className='flex max-sm:flex-col gap-5 justify-end'>
            <button className={`bg-blue-100 px-3 py-2 rounded border border-slate-400 hover:bg-blue-950 hover:text-white ${showCF ? "bg-blue-800 text-white" : ""}`} onClick={() => showCF ? setShowCF(false) : setShowCF(true)}>Add Category</button>
            <button className={`bg-blue-100 px-3 py-2 rounded border border-slate-400 hover:bg-blue-950 hover:text-white ${showSCF ? "bg-blue-800 text-white" : ""}`} onClick={() => showSCF ? setShowSCF(false) : setShowSCF(true)}>Add Sub Category</button>
          </div>
          <div className={showCF ? `p-5 max-sm:py-5 max-sm:px-0` : "hidden"}>
            <CategoryForm />
          </div>
          <div className={showSCF ? `p-5 max-sm:py-5 max-sm:px-0` : "hidden"}>
            <SubCategoryForm />
          </div>
          <div className='p-5 max-sm:p-0 max-sm:py-5 w-full'>

            <table className="border-collapse border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 bg-gray-100">Categories</th>
                  <th className="border border-slate-300 p-2 bg-gray-100">Sub Categories</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="border border-slate-300 hover:bg-blue-100 w-full">
                    <td className="border border-slate-300 p-2">{category.category}</td>
                    <td className="border border-slate-300 p-2">
                      {category.subCategories.length > 0 ? (
                        category.subCategories.map((item, subIndex) => (
                          <span key={subIndex} className="block">{item.subCategory}</span>
                        ))
                      ) : (
                        <span className="text-gray-500">No Sub Categories</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories