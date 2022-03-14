import axios from "axios";

const getUserDetailsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getAllUsers`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getUserDetailsAPI;