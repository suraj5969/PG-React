import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const updateWorkflowAPI = async (row_id,values) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updateWorkflow/${row_id}`,values,axiosConfig)
    .then((response)=>{
        // console.log(response);
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default updateWorkflowAPI;