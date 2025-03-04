import { faBan, faHeart, faIndianRupee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteProduct from '../functional-components/DeleteProduct'
import { toast } from 'react-toastify'

const ProductsListing = ({ products, authId, role }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem(authId);

    async function handleProductDelete(productId) {
        try {
            let response = await DeleteProduct(token, productId);
            toast.success(response);
                setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.log("error in handleProducDelete : ",error);
            
        }
    }

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <div key={product._id} href={product.href} className="group hover:shadow-2xl rounded-lg p-2">
                    <img
                        onClick={() => navigate(`/product-overview/${product._id}/${role}/${authId}`)}
                        alt={product.imageAlt}
                        src={product.images[0]}
                        className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <div className={`flex items-start justify-between p-3`}>
                        <div className='space-y-2' onClick={() => navigate(`/product-overview/${product._id}/${role}/${authId}`)}>
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className='text-sm text-gray-700'>{product.subCategory?.subCategory}</p>
                            <p className="text-sm font-semibold"> <FontAwesomeIcon icon={faIndianRupee} /> {product.price}</p>
                        </div>
                        <div className={`flex flex-col gap-3 justify-end ${authId == product?.vendor._id || role == "Admin" ? "hidden" : ""}`}>
                            <button> <FontAwesomeIcon icon={faHeart} /> </button>
                        </div>
                        <div className={`flex flex-col gap-3 justify-end ${authId == product?.vendor._id || role == "Admin" ? "" : "hidden"}`}>
                            <button className=' hover:text-red-800' onClick={() => handleProductDelete(`${product._id}`)} > <FontAwesomeIcon icon={faTrash} title='delete product' /> </button>
                            <button className=' hover:text-yellow-800' > <FontAwesomeIcon icon={faBan} title='block product' /> </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductsListing