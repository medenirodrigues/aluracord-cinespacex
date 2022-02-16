import React from "react";
import { useEffect } from "react";
//import bootstrap from "bootstrap/dist/js/bootstrap";
//import { popper } from "@popperjs/core";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

/**
 * O CustomApp é uma function provida pelo next para além de outras funcionalidade
 * servir como um wraper para componentes padrões, comumente usado pela comunidade
 * para carregar resets css e etc, como é o caso da func GlobalStyle, para
 * isso é necessário salvar na folder pages o js como "_app.js" não precisa importar
 * e o next faz todo o resto.
 */
export default function CustomApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");

  // }, [])
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}