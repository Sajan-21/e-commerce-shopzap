import axios from 'axios'
import { backendURL } from '../../config/Config'

const GetCategories = async() => {
    try {
        let response = await axios({
            method: "GET",
            url: `${backendURL}/get-categories`,
        });
        return response.data.data;
    } catch (error) {
        console.log("error in GetCategories : ",error);
    }
}

export default GetCategories