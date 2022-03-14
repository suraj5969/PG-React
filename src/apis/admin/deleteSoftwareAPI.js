import axios from "axios";

const deleteSoftwareAPI = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete-software/${id}`);
        return response;
    } catch (error) {
        return { status: 403, error: error };
    }
}

export default deleteSoftwareAPI;