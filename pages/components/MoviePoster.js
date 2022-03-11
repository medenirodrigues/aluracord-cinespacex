import React from "react";
import styled from "styled-components";

const MovieCard = styled.div`
  width: 12rem;
  height: 22rem;
  margin: 14px;
  background-color: white;
`;

export function MoviePoster(props) {
  //const [mdMovieName, setMdMovieName] = React.useState('')

  function fillModalData(event) {

    //const element = event.target
   //console.log(event.target)
    if (event.target.localName === "img" || event.target.localName === "h5") {
      document.getElementById("staticBackdropLabel").textContent = event.target.alt;
    } 

    // vou ter que criar uma request pra esse get pq se eu for fazer
    // esse corre pra todo click a tag html n vai dar conta

    /**
     * quando o user clicar ele pega o alt do img e insere
     * no value do h5 do modal, se ele clicar no título do filme
     * (h5) ele pega o value do titulo e insere no h5 do modal
     */
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
      <MovieCard onClick={fillModalData}>
        <img
          src={
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + props.img
          }
          className="card-img-top"
          alt={props.info}
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
