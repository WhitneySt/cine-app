import React, { useContext, useEffect, useState } from "react";
import { searchParamsContext } from "../../Routes/AppRouter";
import { getDataFuncion } from "../../services/getCiudades";
import "./detailComponent.scss";
import { useNavigate } from "react-router-dom";

const obtenerCantidadFunciones = ({ horaInicio, horaFin, intervalo }) => {
  return (horaFin - horaInicio) / intervalo;
};

const DetailComponent = () => {
  const navigate = useNavigate();

  const { filters, details, setDetails, movieInfo, tickets } =
    useContext(searchParamsContext);

  const [selectedButton, setSelectedButton] = useState({});

  const [showFirstDetails, setShowFirstDetails] = useState(true);

  const totalPrice = tickets.reduce(
    (total, item) => total + item.cantidad * item.price,
    0
  );

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
    console.log(movieInfo);
    // memoizarCantidadFunciones();
  }, [filters, setDetails, movieInfo]);

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
    <>
      {showFirstDetails ? (
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
              setShowFirstDetails(false);
            }}
          >
            Seleccionar Boletos
          </button>
        </div>
      ) : (
        <>
          <h3>Resumen de compra</h3>
          <section>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieInfo?.poster_path}`}
                alt={movieInfo.title}
              />
            </figure>
            <div>
              <span>Película: {movieInfo.title}</span>
              <span>Complejo: {details?.cinema}</span>
              <span>Fecha: {filters.date}</span>
              <span>Función: {details.horaFuncion}</span>
              {details.asientos && details.asientos.length && (
                <span>Asientos: {details.asientos}</span>
              )}
            </div>
          </section>
          <p>Se realizará un cargo por servicio por cada boleto de la orden.</p>
          <div>
            <span>Total (iva incluido):</span>
            <span>{`$ ${totalPrice.toLocaleString()}`}</span>
          </div>
          <button
            disabled={totalPrice ? false : true}
            onClick={() => {
              navigate(`asientos`);
            }}
          >
            Continuar
          </button>
        </>
      )}
    </>
  );
};

export default DetailComponent;
