import axios from "axios";

async function resetPasswordTokenAPI(token) {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reset-password-token`, { token: token })
        .then(result => {
            // console.log(result);
            return result;
        })
        .catch((error) => {
            console.log(error);
            return { status: 503, message: 'Server down, Please contact the Administrator' };
        })
}

export default resetPasswordTokenAPI;