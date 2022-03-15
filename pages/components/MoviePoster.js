import React from "react";
import styled from "styled-components";
import { selectedMovieData } from "../../services/themdb.api";

const MoviePosterUnt = styled.div`
  width: 12rem;
  height: 22rem;
  margin: 14px;
  background-color: white;
  cursor: pointer;
`;

export function MoviePoster(props) {

  let [movieDetails, setMovieDetails] = React.useState('')
  
  async function fillModalData(event) {
      setMovieDetails(await selectedMovieData(event.target.id));

      document.getElementsByClassName("modal-title").innerText = movieDetails.original_title;
      const modalMovie = bootstrap.Carousel.getInstance(modalMovie)
      console.log(modalMovie)
  }

  return (
    <>
      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Titulo: {`${movieDetails.original_title}${new Date}`}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button type="button" className="btn btn-primary">
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <MoviePosterUnt
        onClick={fillModalData}
        id={props.idValue}
        // data-bs-toggle="modal"
        // data-bs-target="#staticBackdrop"
      >
        <img
          src={
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + props.img
          }
          className="card-img-top"
          alt={props.info}
          style={{ pointerEvents: "none" }}
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              fontSize: "0.9rem",
              pointerEvents: "none",
            }}
          >
            {props.movieName}
          </h5>
        </div>
      </MoviePosterUnt>
    </>
  );
}
