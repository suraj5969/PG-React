import axios from "axios";

const getMigrationsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getMigrations`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getMigrationsAPI;