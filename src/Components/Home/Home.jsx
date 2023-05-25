import { CircularProgress, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import { searchParamsContext } from "../../Routes/AppRouter";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = ({ movieList }) => {
  const [posters, setPosters] = useState([]);

  const navigate = useNavigate();

  const { ubication, cines, date, setFilters } =
    useContext(searchParamsContext);

  useEffect(() => {
    console.log(movieList);
    if (!posters.length) {
      const playNow = getPosters(movieList);
      setPosters(playNow);
    }
    console.log(posters);
  }, [movieList, posters]);

  const getPosters = (arrayMovies) => {
    const posters = arrayMovies.map((item) => {
      const urlBase = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
      return {
        id: item.id,
        image: `${urlBase}${item.poster_path}`,
        title: item.title,
      };
    });
    return posters;
  };

  const handleNavigateDetails = (idMovie, titleMovie) => {
    
    if (!ubication || !cines || !date) {
      Swal.fire("Oopss!", "No has completado todos los datos", "error");
    } else {
      const params = {
        ubication, cines, date, idMovie
      }
      setFilters(params);
      
      Swal.fire("Good job!", "Has seleccionado un función!", "success").then(() => {
        sessionStorage.setItem("searchParams", JSON.stringify(params));
        navigate(`/${titleMovie}`);
      });
    }
  };
  return (
    <main className="main">
      <h1>Cartelera</h1>
      <p>Estas son todas las películas disponibles</p>
      <section className={posters.length ? "main__cards" : "main__spin"}>
        {posters.length ? (
          posters.map((item) => (
            <figure key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                onClick={() => {
                  handleNavigateDetails(item.id, item.title);
                }}
              />
            </figure>
          ))
        ) : (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        )}
      </section>
    </main>
  );
};

export default Home;
