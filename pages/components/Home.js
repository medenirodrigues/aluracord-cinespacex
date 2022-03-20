import React from "react";

import appConfig from "../../config.json";
import Chat from "./Chat";
import styled from "styled-components";
import { BackgroundWrapper } from "../index";
import { MoviePoster } from "./MoviePoster";
import { movieData, selectedMovieData } from "../../services/themdb.api";

const HomeBackground = styled(BackgroundWrapper)`
  height: 100%; // Criar um cálculo que exiba uma quantidade de filmes maior com base nesse tamanho
  /* width: vw; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-blend-mode: multiply;
  background-color: ${appConfig.theme.colors.primary["500"]};
`;

// const UlMovies = styled.ul`
//   width: 90vw;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
// `;

export default function Home() {
  const [movieArray, setMovieArray] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  /**
   * This useEffect active a call to movieData() service for charge
   * array movie list "", and set the first page number and update
   * this list to each currentPage is updated
   */
  React.useEffect(() => {
    movieData(setMovieArray, currentPage, movieArray);
  }, [currentPage]);

  /**
   * This useEffect is watching sentinel html element to update
   * currentPage number and call movieData() service.
   */
  React.useEffect(() => {
    const intersecObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage(() => {
          return currentPage++;
        });
        movieData(setMovieArray, currentPage, movieArray);
      }
    });

    intersecObserver.observe(document.querySelector(".sentinel"));
    return () => intersecObserver.disconnect();
  }, []);

  return (
    <HomeBackground>
      {movieArray?.map((movie, idx) => {
        return (
          //Averiguar o porque q o style do bootstrap n tá funfando
          // provavelmente por canta das classes
          <>
            <MoviePoster
              img={movie.poster_path}
              idValue={movie.id}
              movieName={movie.original_title}
              key={`${movie.original_title}-${idx}`}
              info={movie.original_title}
            />
          </>
        );
      })}
      <Chat />
      <div className="row">
        <div className="text-center sentinel">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </HomeBackground>
  );
}
