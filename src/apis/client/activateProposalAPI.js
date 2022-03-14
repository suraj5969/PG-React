import axios from "axios";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

async function activateProposalAPI(proposal_no){
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/activateProposal/${proposal_no}`, axiosConfig)
    .then(result=>{
        return result;
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'Unable to connect to server Please contact the Administrator'};
    })
}

export default activateProposalAPI;