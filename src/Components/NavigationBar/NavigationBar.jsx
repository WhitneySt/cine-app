import React from "react";
import logo from "./../../assets/logo.png";
import { NavLink } from "react-router-dom";
import './navigationBar.scss';

const NavigationBar = () => {
  return (
    <nav className="navBar">
      <section>
        <figure className="navBar__figure">
          <img src={logo} alt="logo" />
        </figure>
        <NavLink className={"navBar__link"} to="/">Cartelera</NavLink>
      </section>
      <form>
        <div>
          <label htmlFor="">Ubicación</label>
          <select name="ubicacion">
            <option value="">Escoja una ubicación</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Cines Cercanos</label>
          <select name="cines">
            <option value="">Escoja una sala de cine </option>
          </select>
        </div>
        <div>
          <label htmlFor="">Fecha</label>
          <input type="date"/>
        </div>
      </form>
    </nav>
  );
};

export default NavigationBar;
