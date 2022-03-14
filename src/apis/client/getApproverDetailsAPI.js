import axios from "axios";

const getApproverDetailsAPI = async (proposal_no) => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getApproverDetails/${proposal_no}`)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default getApproverDetailsAPI;