import axios from "axios";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

async function editProposalDetailsAPI(proposalNo, user_id, reason) {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/editProposalDetails/${proposalNo}`, { user_id: user_id, reason: reason }, axiosConfig)
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.log("Error is : " + error);
            return { 'status': 503, 'message': 'Unable to connect to server Please contact the Administrator' };
        })
}

export default editProposalDetailsAPI;