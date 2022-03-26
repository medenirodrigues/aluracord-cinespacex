import React from "react";

import appConfig from "../../config.json";
import Chat from "../components/Chat";
import styled from "styled-components";

import { BackgroundWrapper } from ".";
import { movieData } from "../../services/themdb.api";
import MoviePoster  from "../components/MoviePoster";

const HomeBackground = styled(BackgroundWrapper)`
  height: 100%; 
  justify-content: center;
  flex-wrap: wrap;
  background-blend-mode: multiply;
  background-color: ${appConfig.theme.colors.primary["500"]};
`;

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
          /**
           * There are a fix to solve on this component a bootstrap issue
           */
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
