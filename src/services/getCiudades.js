import axios from "axios";

const API_FAKE = "https://minibackend-cine-app-production-8310.up.railway.app/";
const endpointCiudades = "ciudades";

export const getCiudades = async () => {
    try {

        const { data } = await axios.get(`${API_FAKE}${endpointCiudades}`);
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}