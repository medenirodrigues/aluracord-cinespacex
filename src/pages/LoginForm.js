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
  min-width: 180px;
  min-height: 180px;
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
  profileAvatar,
  userTip,
  onchange,
  onclick,
  oninput,
  btnLabel,
}) {
  return (
    <>
      <SecWrap>
        <Avatar src={profileAvatar} title={userTip} />
        <TextField
          id="user-input"
          value={textValue}
          placeholder={placeholder}
          onChange={onchange}
          // onInput={oninput}
        />
        <Button type="submit" onClick={onclick}>{btnLabel}</Button>
      </SecWrap>
    </>
  );
}
