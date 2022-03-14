import axios from "axios";

async function loginAPI(credentials){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,credentials)
    .then(result=>{
        return result.data
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default loginAPI;