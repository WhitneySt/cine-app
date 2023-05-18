import axios from "axios";

const API_FAKE = "https://minibackend-cine-app-production-8310.up.railway.app/";
const endpointFunciones = "funciones";

export const getFechasFunciones = async () => {
  try {
    const { data } = await axios.get(`${API_FAKE}${endpointFunciones}`);

    const fechasDisponibles = [];

    for (const element of data) {
      const fechas = element.programacion.date;

      fechas.forEach((fecha) => {
        if (!fechasDisponibles.some((item) => item === fecha.dia)) {
          fechasDisponibles.push(fecha.dia);
        }
      });
    }

      return fechasDisponibles;
      
  } catch (error) {
    console.log(error);
    return [];
  }
};
