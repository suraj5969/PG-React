import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const editTrainingMethods = async (id,values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/edit-trainings/${id}`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default editTrainingMethods;