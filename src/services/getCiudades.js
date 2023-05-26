import axios from "axios";

const API_FAKE = "https://minibackend-cine-app-production-8310.up.railway.app/";
const endpointCiudades = "ciudades";
const endPointFunciones = "funciones";

export const getCiudades = async () => {
  try {
    const { data } = await axios.get(`${API_FAKE}${endpointCiudades}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDataFuncion = async (idCity, idTeatro, idMovie) => {
  try {
    const { data } = await axios.get(
      `${API_FAKE}${endpointCiudades}/${idCity}`
    );

    const { data: funcion } = await axios.get(
      `${API_FAKE}${endPointFunciones}?idMovie=${idMovie}`
    );

    const theaters = data.teatros.find((item) => item.id === idTeatro);

    const sala = theaters.salas.find(
      (item) => item.idFuncion === funcion[0].id
    );

    const infoFunciones = {
      city: data.name,
      cinema: theaters.name,
      idSala: sala.id,
      idFuncion: funcion[0].id,
      horaInicio: funcion[0].programacion.horaPrimeraFuncion,
      horaFin: funcion[0].programacion.horaUltimaFuncion,
      intervalo: funcion[0].programacion.intervalos,
      idMovie,
    };

    return infoFunciones;
  } catch (error) {
    console.log(error);
    return {};
  }
};
