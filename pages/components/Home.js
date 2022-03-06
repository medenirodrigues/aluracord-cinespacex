import React from "react";

import appConfig from "../../config.json";
//import InfiniteScroll from "infinite-scroll"
import Bootstrap from "../bootstrap/globalBootstrap";
import styled from "styled-components";
import { BackgroundWrapper } from "../index";
import { MoviePoster } from "./MoviePoster";
import { movieData } from "../../services/themdb.api";

/**
 * Design
 * [ ] O usuário vai poder clicar em cada um dos filmes exibidos na home e ao clicar
 *     exibirá num modal detalhes sobre o filme
 * [ ] O usuário poderá abrir o chat pra conversar sobre determinado filme
 *
 * Dev
 * [ ] Cria um array com nomes dos filmes que serãos exibidos na home
 * [ ] Ao clicar em determinado filme uma request é feita para a API do IMDB que retorna detelhes sobre o filme
 *     e exibe num modal
 */

const HomeBackground = styled(BackgroundWrapper)`
  height: 100%; // Criar um cálculo que exiba uma quantidade de filmes maior com base nesse tamanho
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
  React.useEffect(() => {
    // ver isso 
    movieData(currentPage, setMovieArray);
  }, [currentPage])


  React.useEffect(() => {
    const intersecObserver = new IntersectionObserver((entries) => {
      //console.log(entries);
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage(() => {
          return currentPage++
        })
        movieData(currentPage, setMovieArray)
      }
    });

    intersecObserver.observe(document.querySelector(".sentinel"));
    return () => intersecObserver.disconnect();

  },[]);

  //console.log(movieArray);
  return (
    <HomeBackground>
      <h1 style={{ color: "white",}}>
      {currentPage}
      </h1>
      {movieArray?.map((movie, idx) => {
        return (
          //Averiguar o porque q o style do bootstrap n tá funfando
          // provavelmente por canta das classes
          <MoviePoster
            img={movie.poster_path}
            movieName={movie.original_title}
            key={`${movie.original_title}-${idx}`}
            info={movie.original_title}
          />
        );
      })}
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
