import axios from "axios";

const getQuickServicesAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getQuickServices`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getQuickServicesAPI;