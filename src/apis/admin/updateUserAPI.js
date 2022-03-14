import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const updateUserAPI = async (user_id,values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/update/${user_id}`,values,axiosConfig)
    .then((response)=>{
        // console.log(response);
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default updateUserAPI;