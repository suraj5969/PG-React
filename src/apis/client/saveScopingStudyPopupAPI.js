import axios from "axios";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

async function saveScopingStudyPopupAPI(values){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/saveScopingStudyPopup`,values,axiosConfig)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default saveScopingStudyPopupAPI;