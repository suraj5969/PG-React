import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const editQuickServicesAPI = async (id,values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/edit-quickservices/${id}`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default editQuickServicesAPI;