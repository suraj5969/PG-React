import axios from "axios";

const getGSTpercentageAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getGSTpercentage`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getGSTpercentageAPI;