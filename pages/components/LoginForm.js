import React from "react";
import appConfig from "../../config.json";
import styled from "styled-components";

const SecWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Avatar = styled.img`
  width: 180px;
  border-radius: 50%;
  margin-bottom: 16px;
  align-items: center;
  border: 6px solid ${appConfig.theme.colors.primary["050"]};
`;

const TextField = styled.input`
  width: 100%;
  max-width: 300px;
  height: 36px;
  padding-left: 15px;
  border: none;
  border-radius: 8px;
  background-color: ${appConfig.theme.colors.primary["050"]};
`;

const Button = styled.button`
  width: 100%;
  max-width: 200px;
  height: 36px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${appConfig.theme.colors.primary[
    "200"
  ]}; // Acrescentar dinamismo
  transition: background-color 0.5s ease-out;
  color: white;
  margin: 20px;

  &:hover {
    background-color: ${appConfig.theme.colors.primary["400"]};
  }
`;

export default function LoginForm({
  placeholder,
  textValue,
  src,
  title,
  onchange,
  btnLabel,
  onclick,
}) {
  console.log(btnLabel)
  return (
    <>
      <SecWrap>
        <Avatar src={src} title={title} />
        <TextField
          value={textValue}
          placeholder={placeholder}
          onChange={onchange}
        />
        <Button type="submit" onClick={onclick}>{btnLabel}</Button>
      </SecWrap>
    </>
  );
}