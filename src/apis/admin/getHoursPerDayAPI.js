import axios from "axios";

const getHoursPerDayAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getHoursPerDay`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getHoursPerDayAPI;