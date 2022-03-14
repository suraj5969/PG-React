import axios from "axios";

const getOracleWordingsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getOracleWordings`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getOracleWordingsAPI;