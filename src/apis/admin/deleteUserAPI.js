import axios from "axios";

const deleteUserAPI = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete-user/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export default deleteUserAPI;