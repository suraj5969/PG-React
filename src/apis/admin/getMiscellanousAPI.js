import axios from "axios";

const getMiscellanousAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getMiscellanous`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getMiscellanousAPI;