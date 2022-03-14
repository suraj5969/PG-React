import axios from "axios";

const getWorkflowDetailsAPI = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getWorkflow`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getWorkflowDetailsAPI;