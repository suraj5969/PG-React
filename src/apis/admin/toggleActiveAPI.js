import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const toggleActiveAPI = async (user_id,value) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/toggleActive/${user_id}`,value,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        return error;
    })
}

export default toggleActiveAPI;