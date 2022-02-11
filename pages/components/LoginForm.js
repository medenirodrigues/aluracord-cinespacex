import React from "react";
import appConfig from "../../config.json";
import styled from "styled-components";

const SecWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Avatar = styled.img`
  width: 200px;
  border-radius: 50%;
  margin-bottom: 16px;
  align-items: center;
`;

const TextField = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 8px;
  background-color: #c2f0ff;
  /* integrar ao config ↑  */
`;

export default function LoginForm({ placeholder, value, src, title, onchange}) {
  return (
    <>
      <SecWrap>
        <Avatar src={src} title={title}/>
        <TextField
          value={value}
          placeholder={placeholder}
          onChange={onchange}
        />
      </SecWrap>
    </>
  );
}
