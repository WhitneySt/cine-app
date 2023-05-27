import React, { useContext } from "react";
import { searchParamsContext } from "../../Routes/AppRouter";

const SeleccionBoletos = () => {
  const { tickets, setTickets } = useContext(searchParamsContext);

  const handleMinus = (index) => {
    if (tickets[index].cantidad > 0) {
      const ticketCopia = [...tickets];
      ticketCopia[index].cantidad--;
      setTickets([...ticketCopia]);
    }
  };

  const handlePluss = (index) => {
    const cantidadTotal = tickets.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    if (cantidadTotal < 10) {
      const ticketCopia = [...tickets];
      ticketCopia[index].cantidad++;
      setTickets([...ticketCopia]);
    }
  };

  return (
    <div>
      <h1>Selecciona tus boletos</h1>
      <p>Puedes comprar 10 boletos máximo por transacción</p>
      <div>
        {tickets.length &&
          tickets.map((item, index) => (
            <div key={index}>
              <h5>{item.name}</h5>
              <section>
                <span>{`${item.price.toLocaleString()}`}</span>
                <button
                  onClick={() => {
                    handleMinus(index);
                  }}
                >
                  -
                </button>
                <span>{item.cantidad}</span>
                <button
                  onClick={() => {
                    handlePluss(index);
                  }}
                >
                  +
                </button>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeleccionBoletos;
