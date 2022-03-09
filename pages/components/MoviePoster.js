import React from "react";
import styled from "styled-components";

const MovieCard = styled.div`
  width: 12rem;
  height: 22rem;
  margin: 14px;
  background-color: white;
`;

export function MoviePoster(props) {
  const [mdMovieName, setMdMovieName] = React.useState('')

  function fillModalData() {
    console.log(props.movieName)
    setMdMovieName(props.movieName)
  }
  return (
    <>
      <div
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
                {props.movieName}
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
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <MovieCard>
        <img
          src={
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + props.img
          }
          className="card-img-top"
          alt={props.info}
          onClick={fillModalData}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        />
        <div className="card-body">
          <h5 className="card-title" id={props.idValue} style={{ fontSize: "0.9rem" }}>
            {props.movieName}
          </h5>
        </div>
      </MovieCard>
    </>
  );
}
