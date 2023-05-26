import React, { useContext, useEffect, useState } from "react";
import { searchParamsContext } from "../../Routes/AppRouter";
import { getDataFuncion } from "../../services/getCiudades";
import "./detailComponent.scss";
import { useNavigate} from "react-router-dom";

const obtenerCantidadFunciones = ({ horaInicio, horaFin, intervalo }) => {
  return (horaFin - horaInicio) / intervalo;
};

const DetailComponent = () => {

  const navigate = useNavigate();

  const { filters, details, setDetails } = useContext(searchParamsContext);

  const [selectedButton, setSelectedButton] = useState({});

  // const [cantidadFunciones, setCantidadFunciones] = useState(0);

  // const memoizarCantidadFunciones = useCallback(() => {
  //   const numeroFunciones = obtenerCantidadFunciones(details);
  //   setCantidadFunciones(numeroFunciones);
  // }, [details]);

  useEffect(() => {
    getDataFuncion(filters.ubication, filters.cines, filters.idMovie).then(
      (response) => {
        setDetails({ ...response });
        console.log(response);
      }
    );

    // memoizarCantidadFunciones();
  }, [filters, setDetails]);

  const BotonesFunciones = () => {
    const cantidadFunciones = obtenerCantidadFunciones(details);
    const botones = [];
    let hora = details.horaInicio;
    for (let index = 1; index <= cantidadFunciones; index++) {
      const horaFuncion = `${hora}:00`;
      botones.push(
        <button
          key={index}
          className={
            selectedButton[horaFuncion] ? "button button--selected" : "button"
          }
          onClick={() => {
            setDetails({ ...details, horaFuncion });
            setSelectedButton({
              [horaFuncion]: !selectedButton[horaFuncion],
            });
          }}
        >
          {horaFuncion}
        </button>
      );
      hora = hora + details.intervalo;
    }
    return <div>{botones}</div>;
  };

  return (
    <div>
      <h3>Horarios disponibles -{filters.date}</h3>
      <p>Elige el horario que prefieras</p>
      <h4>{details?.cinema}</h4>
      <BotonesFunciones />
      <button
        disabled={
          Object.values(selectedButton).some((item) => item === true)
            ? false
            : true
        }

        onClick={() => {
          navigate(`boletos`);
        }}
      >
        Seleccionar Boletos
      </button>
    </div>
  );
};

export default DetailComponent;
