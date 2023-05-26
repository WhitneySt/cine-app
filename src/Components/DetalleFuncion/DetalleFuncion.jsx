import React, { useContext, useEffect } from "react";
import DetailComponent from "../detailComponent/DetailComponent";
import { searchParamsContext } from "../../Routes/AppRouter";
import { Outlet, useNavigate } from "react-router-dom";

const DetalleFuncion = () => {
  const navigate = useNavigate();

  const { filters } = useContext(searchParamsContext);

  useEffect(() => {
    if (Object.entries(filters).length === 0) {
      navigate("/");
    }
  }, [filters, navigate]);

  return (
    <div>
      <DetailComponent />
      <Outlet/>
    </div>
  );
};

export default DetalleFuncion;
