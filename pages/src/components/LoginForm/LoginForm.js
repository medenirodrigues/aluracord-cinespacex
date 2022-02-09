import React from "react";
import appConfig from "../../../../config.json";
import styled from "styled-components";

export const Avatar = styled.img`

`

export const TextField = styled.input`
    width: 100%;
    border: none;
    border-radius: 8px;
    background-color: #C2F0FF;
     /* integrar ao config ↑  */
`

function LoginForm() {
  return (
    <>
      <section>
        <TextField />
      </section>
    </>
  );
}
