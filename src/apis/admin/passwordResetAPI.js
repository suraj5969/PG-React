import axios from "axios";

async function passwordResetAPI(user_id, currentPass, newPass) {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/passwordReset`, { user_id: user_id, currentPass: currentPass, newPass: newPass })
        .then(result => {
            // console.log(result);
            return result;
        })
        .catch((error) => {
            console.log(error);
            return { status: 503, message: 'Server down, Please contact the Administrator' };
        })
}

export default passwordResetAPI;