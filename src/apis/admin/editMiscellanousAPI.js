import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const editMiscellanousAPI = async (id,values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/editMiscellanous/${id}`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default editMiscellanousAPI;