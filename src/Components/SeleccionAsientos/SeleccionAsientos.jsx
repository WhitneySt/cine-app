import React, { useContext, useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";
import { compras } from "../../services/data";
import { searchParamsContext } from "../../Routes/AppRouter";

const SeleccionAsientos = () => {
  const { filters, details, setDetails, movieInfo, tickets } =
    useContext(searchParamsContext);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [posicion, setPosicion] = useState(0);

  const asientosOcupados = compras.filter(
    (item) =>
      item.idCity === filters.ubication &&
      item.idCinema === filters.cines &&
      item.idSala === details.idSala &&
      item.date === filters.date &&
      item.hour === details.horaFuncion
  );

  console.log(asientosOcupados);
  const Asientos = () => {
    const asientos = [];
    const filas = 9;
    const columnas = 16;

    // const colors = [
    //   {
    //     name: "seleccion",
    //     color: "rgb(247, 234, 54)",
    //   },
    //   {
    //     name: "ocupado",
    //     color: "rgb(247, 54, 80)",
    //   },
    //   {
    //     name: "disponible",
    //     color: "rgb(131, 227, 233)",
    //   },
    // ];

    for (let index = 0; index < filas; index++) {
      const arrayFilas = [];
      for (let position = 0; position < columnas; position++) {
        const isSpecialColumn = position === 7;
        const codeSeat = `${String.fromCharCode(65 + index)}${position + 1}`;

        const estaOcupado = asientosOcupados.some(
          (item) => item.codeSeat === codeSeat
        );
        const estaSeleccionado = selectedSeats.some(
          (item) => item === codeSeat
        );
        arrayFilas.push(
          // <button
          //   key={position}
          //   style={{
          //     color: "rgb(15, 14, 1)",
          //     marginRight: isSpecialColumn ? "50px" : "10px",
          //     width: "50px",
          //     height: "50px"
          //   }}
          // >
          //   {codeSeat}
          // </button>
          <ChairIcon
            key={codeSeat}
            sx={{
              color: estaOcupado
                ? "rgb(247, 54, 80)"
                : estaSeleccionado
                ? "rgb(247, 234, 54)"
                : "rgb(131, 227, 233)",
              marginRight: isSpecialColumn ? "50px" : "10px",
              cursor: "pointer",
            }}
            onClick={
              () => {
                const cantidadTotal = tickets.reduce(
                  (total, item) => total + item.cantidad,
                  0
                );
                if (selectedSeats.length < cantidadTotal) {
                  
                  setSelectedSeats([...selectedSeats, codeSeat]);  
                  setDetails({
                    ...details,
                    asientos: [...selectedSeats, codeSeat],
                  });
                }
                if (selectedSeats.length === cantidadTotal) {
                  const seat = [...selectedSeats];
                  seat[posicion] = codeSeat;
                  setSelectedSeats([...seat]);
                  const nuevaPosicion =
                    selectedSeats.length - 1 === posicion ? 0 : posicion + 1;
                  setPosicion(nuevaPosicion);
                  setDetails({ ...details, asientos: [...seat] });
                }
                
              }
            }
          />
        );
      }
      asientos.push(<div key={index}>{arrayFilas}</div>);
    }

    return <div>{asientos}</div>;
  };

  return (
    <div>
      <h1>Selecciona tus asientos</h1>
      <p>Para cambiar tu lugar asignado da click en el asiento deseado</p>
      <section>
        <div>
          <ChairIcon sx={{ color: "rgb(247, 234, 54)" }} />
          <span>Selección</span>
        </div>
        <div>
          <ChairIcon sx={{ color: "rgb(247, 54, 80)" }} />
          <span>Ocupado</span>
        </div>
        <div>
          <ChairIcon sx={{ color: "rgb(131, 227, 233)" }} />
          <span>Disponible</span>
        </div>
      </section>
      <hr />
      <Asientos />
    </div>
  );
};

export default SeleccionAsientos;
