import axios from "axios";

const getSoftwaresAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getSoftwares`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getSoftwaresAPI;