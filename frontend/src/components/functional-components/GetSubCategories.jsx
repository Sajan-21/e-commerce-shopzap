import axios from 'axios'
import { backendURL } from '../../config/Config'

async function GetSubCategories(categoryId, token) {
    try {
        let response = await axios({
            method: "GET",
            url: `${backendURL}/get-sub-categories/${categoryId}`,
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data.data;
    } catch (error) {
        console.log("error in GetSubCategory : ",error);
    }
}

export default GetSubCategories