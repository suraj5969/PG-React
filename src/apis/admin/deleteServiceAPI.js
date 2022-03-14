import axios from "axios";

const deleteServiceAPI = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete-service/${id}`);
        return response;
    } catch (error) {
        return { status: 403, error: error };
    }
}

export default deleteServiceAPI;