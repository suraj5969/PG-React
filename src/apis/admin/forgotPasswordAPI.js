import axios from "axios";

async function forgotPasswordAPI(email){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/forgotPassword`,{email: email})
    .then(result=>{
        // console.log(result.data);
        return result.data;
    })
    .catch((error)=>{
        // console.log(error);
        // if (error.response.data) {
        //     console.log(error.response.data);
        //   }
        return {status:503,message:'Server down! Please contact the Administrator'};
    })
}

export default forgotPasswordAPI;