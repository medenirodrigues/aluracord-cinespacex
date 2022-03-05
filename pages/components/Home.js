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

export default function Home() {
  const [movieArray, setMovieArray] = React.useState([]);

  React.useEffect(() => {
    movieData(setMovieArray);
    console.log(movieArray)
  }, [])

  console.log(movieArray)
  return (
    <HomeBackground>
      {appConfig.movies.map((movie, idx) => {
        return (
          //Averiguar o porque q o style do bootstrap n tá funfando
          // provavelmente por caisa das classes
          <MoviePoster 
            img={"https://m.media-amazon.com/images/M/MV5BMGFkNWI4MTMtNGQ0OC00MWVmLTk3MTktOGYxN2Y2YWVkZWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"}
            movieName={movie}
            key={movie + idx}
            info={movie}
          />
        );
      })}
      {/* <h1>Home</h1> */}
    </HomeBackground>
  );
}
