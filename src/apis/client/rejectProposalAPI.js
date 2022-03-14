import axios from "axios";


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

async function rejectProposalAPI(proposal_no, reason){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/rejectProposal/${proposal_no}`,{reason: reason}, axiosConfig)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default rejectProposalAPI;