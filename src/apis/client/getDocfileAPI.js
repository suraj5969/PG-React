
import axios from 'axios';

const getDocfileAPI = async () => {
    
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getDocfile/LNPROP001`)
    .then((res)=>{
        return res;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    
    })
}

export default getDocfileAPI;