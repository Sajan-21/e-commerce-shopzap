import React from 'react'
import axios from 'axios'
import { backendURL } from '../../config/Config'

async function DeleteProduct(token, productId) {
    try {
        let response = await axios({
            method: "DELETE",
            url: `${backendURL}/delete-product/${productId}`,
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data.message
    } catch (error) {
        console.log("error in DeleteProduct : ",error);
        
    }
}

export default DeleteProduct