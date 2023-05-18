import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar'
import { getCiudades } from '../../services/getCiudades';
import { getFechasFunciones } from '../../services/getFechasFunciones';

const Layout = () => {
    const [ubication, setUbication] = useState("");
    const [cines, setCines] = useState("");
  const [date, setDate] = useState("");
  
  const [paramsSearch, setParamsSearch] = useState({})

    const [cities, setCities] = useState([]);
    const [teatros, setTeatros] = useState([]);
    const [fechas, setFechas] = useState([]);

    useEffect(() => {
      getCiudades()
        .then((response) => {
          if (!cities.length) {
            setCities(response);
          }
        })
        .catch((error) => console.log(error));

      getFechasFunciones()
        .then((response) => {
          setFechas(response);
        })
        .catch((error) => console.log(error));
    }, [cities, teatros]);
  
  
  const handleChangeParamsSearch = (name, value) => {
    const dataSearch = {}
    
  }

    const handleChangeUbication = (event) => {
      const cinema = event.target.value;
      setUbication(cinema);
      const cinemasCity = cities.length
        ? cities.find((item) => item.id === cinema)
        : {};
      const theater = Object.entries(cinemasCity).length
        ? cinemasCity?.teatros
        : [];
      setTeatros(theater);
    };
    const handleChangeCines = (event) => {
      setCines(event.target.value);
    };

    const handleChangeDate = (event) => {
      setDate(event.target.value);
    };

  return (
      <div>
          <NavigationBar/>
          <Outlet/>
    </div>
  )
}

export default Layout