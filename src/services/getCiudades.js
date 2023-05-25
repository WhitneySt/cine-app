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

export const getCityCinema = async(idCity, idTeatro) => {
    try {
        const { data } = await axios.get(
          `${API_FAKE}${endpointCiudades}?id=${idCity}`
        );
        

        const theaters = data[0].teatros.find(item => item.id === idTeatro);
        console.log(theaters);

        const infoFunciones = {
          city: data[0].name,
          cinema: theaters.name,
        };

        return infoFunciones;
        
    } catch (error) {
        console.log(error);
        return {};
    }
}