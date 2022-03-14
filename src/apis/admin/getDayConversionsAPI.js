import axios from "axios";

const getDayConversionsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getDayConversions`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getDayConversionsAPI;