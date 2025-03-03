
const CheckLogin = (params) => {
    try {
        return params.authId ? true : false;
    } catch (error) {
        console.log("error in checkLogin : ",error);
    }
}

export default CheckLogin