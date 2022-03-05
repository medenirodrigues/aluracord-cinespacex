import React from "react";

import Bootstrap from "../bootstrap/globalBootstrap";
import styled from "styled-components";

const MovieCard = styled.div`
  width: 12rem;
  height: 22rem;
  margin: 14px;
  background-color: white;
`;

export function MoviePoster(props) {
  return (
    <MovieCard>
      <img
        src={props.img}
        className="card-img-top"
        alt={props.info}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "0.9rem" }}>
          {props.movieName}
        </h5>
      </div>
    </MovieCard>
  );
}
