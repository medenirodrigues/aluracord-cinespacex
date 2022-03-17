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
  async function fillModalData(event) {
    const movieDetails = await selectedMovieData(event.target.id);
    const movieModal = new bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );

    console.log(movieDetails);

    document.getElementById("staticBackdropLabel").innerText =
      movieDetails.original_title;

    document.getElementById("modalId").innerText = movieDetails.overview;

    document.getElementById("modalImg").src =
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
      movieDetails.poster_path;

    movieModal.toggle();
  }

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    <img src="" className="img-fluid rounded" id="modalImg" />
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <p className="" id="modalId"></p>
                  </div>
                </div>
              </div>
            </div>
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
      </div>

      <MoviePosterUnt
        onClick={fillModalData}
        id={props.idValue}
        // data-bs-toggle={activeModal}
        //data-bs-target="#staticBackdrop"
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
