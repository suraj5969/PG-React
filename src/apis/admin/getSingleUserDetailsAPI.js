import axios from "axios";

const getSingleUserDetailsAPI = async (user_id) => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/${user_id}`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getSingleUserDetailsAPI;