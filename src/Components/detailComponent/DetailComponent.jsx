import React, { useContext, useEffect, useState } from "react";
import { searchParamsContext } from "../../Routes/AppRouter";
import { getCityCinema } from "../../services/getCiudades";

const DetailComponent = () => {
    const { filters } = useContext(searchParamsContext);

    const [details, setDetails] = useState({});
    
    useEffect(() => {
        console.log(filters);
        getCityCinema(filters.ubication, filters.cines).then((response) => {
            setDetails({ ...response });
            console.log(response);
        });
    }, [filters]);
  return (
    <div>
      <h3>Horarios disponibles -{filters.date}</h3>
      <p>Elige el horario que prefieras</p>
      <h4>{details?.cinema}</h4>
    </div>
  );
};

export default DetailComponent;
