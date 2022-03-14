import axios from "axios";

const getSingleMigrationAPI = async (migration_id) => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getSingleMigrations/${migration_id}`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getSingleMigrationAPI;