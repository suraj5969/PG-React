import axios from "axios";

async function verifyAPI(credentials){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/verify`,{usermail: credentials.email,password: credentials.password})
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Cannot connect to server. Please contact the Administrator'};
    })
}

export default verifyAPI;