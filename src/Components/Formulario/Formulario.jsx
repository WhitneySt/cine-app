import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCiudades } from "../../services/getCiudades";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const stylesInputs = {
  bgcolor: "white",
  minWidth: "200px",
};

export default function Formulario() {
  const [ubication, setUbication] = useState("");
  const [cines, setCines] = useState("");
  const [date, setDate] = useState("");

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCiudades()
      .then((response) => {
        if (!cities.length) {
          setCities(response);
        }
      })
      .catch((error) => console.log(error));
  }, [cities]);

  const handleChangeUbication = (event) => {
    setUbication(event.target.value);
  };
  const handleChangeCines = (event) => {
    setCines(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", gap: "10px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ubicación</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ubication}
          label="Ubicación"
          onChange={handleChangeUbication}
          sx={stylesInputs}
        >
          {cities.length &&
            cities.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {ubication && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cines cercanos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cines}
            label="Cines cercanos"
            onChange={handleChangeCines}
            sx={stylesInputs}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      )}
      {ubication && cines && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Fecha"
            onChange={handleChangeDate}
            sx={stylesInputs}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <InputLabel id="demo-simple-select-label">Mobile variant</InputLabel> */}

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DemoItem sx={{padding:0}}>
              <DatePicker sx={stylesInputs} label="Basic date picker" />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider> */}
        </FormControl>
      )}
    </Box>
  );
}
