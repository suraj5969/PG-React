import axios from "axios";

const getContactDetailsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getContactDetails`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getContactDetailsAPI;