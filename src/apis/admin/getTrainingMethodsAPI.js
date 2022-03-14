import axios from "axios";

const getTrainingMethodsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTrainings`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getTrainingMethodsAPI;