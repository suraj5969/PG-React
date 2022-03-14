import axios from "axios";

async function getAllEmpowerModulesAPI(){
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getAllEmpowerModules`)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default getAllEmpowerModulesAPI;