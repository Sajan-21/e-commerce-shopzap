import axios from 'axios'
import { backendURL } from '../../config/Config'

export default async function GetUser(token,userId) {
    try {
        let response = await axios({
            method: "GET",
            url: `${backendURL}/get-user/${userId}`,
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("res : ", response);
        return response.data.data;
    } catch (error) {
        console.log("error in GetUser : ",error);
    }
}
