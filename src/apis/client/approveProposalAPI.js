import axios from "axios";


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

async function approveProposalAPI(proposal_no, user_id){
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/approveProposal/${proposal_no}`, {user_id: user_id}, axiosConfig)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default approveProposalAPI;