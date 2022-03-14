import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const addSoftwareAPI = async (values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add-software/`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        return error;
    })
}

export default addSoftwareAPI;