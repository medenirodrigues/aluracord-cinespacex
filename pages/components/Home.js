import React from "react";

import appConfig from "../../config.json";
import Bootstrap from "../bootstrap/globalBootstrap";
import styled from "styled-components";
import { BackgroundWrapper } from "../index";

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
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  background-blend-mode: multiply;
  background-color: ${appConfig.theme.colors.primary["500"]};
`;

const MovieCard = styled.div`
  width: 14rem;
  height: 17rem;
  margin: 10px;
  background-color: white;
`;

export default function Home() {
  return (
    <HomeBackground>
      {appConfig.movies.map((movie) => {
        return (
          <MovieCard className="card">
            <img
              src="https://blogdovladimir.files.wordpress.com/2010/02/medico.jpg"
              className="card-img-top"
              alt="#"
            />
            <div className="card-body">
              <h5 className="card-title">
                {movie}
                <a href="#" className="btn btn-primary btn-sm">
                  See More
                </a>
              </h5>
            </div>
          </MovieCard>
        );
      })}
      {/* <h1>Home</h1> */}
    </HomeBackground>
  );
}
