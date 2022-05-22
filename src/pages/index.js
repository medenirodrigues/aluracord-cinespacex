import React from "react";
import { useRouter } from "next/router";

import appConfig from "../../config.json";
import LoginForm from "./LoginForm";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: flex-start; // main axis
  align-items: center; // cross axis
  background-image: url(https://reflectionofbcmlectures.files.wordpress.com/2013/09/old-skool-3d-cinema-audience.jpg);
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;
const CardForm = styled.div`
  display: flex;
  align-items: center; // main axis is the transversal axis, you flex-direction is column
  flex-direction: column;
  width: 50%;
  height: 90%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  vertical-align: middle;
  padding: 85px 70px;
  background-color: ${appConfig.theme.colors.primary["500"]};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: {
    xs: 80%;
    sm: 50%;
  }
  text-align: center;
`;
const LogoTitle = styled.h2`
  color: ${appConfig.theme.colors.neutrals["000"]};
  font-size: small;
  margin-bottom: 10px;
`;
const Greetings = styled.h3`
  color: ${appConfig.theme.colors.neutrals["000"]};
  font-size: medium;
  margin-bottom: 20px;
`;

export default function LoginPage() {
  /***
   * I made this useState point trought of object destructure that first of all create
   * a empty variable for store the username typed
   */
  const [username, setUsername] = React.useState();
  const goTo = useRouter();

  function randomAvatar() {
    const avatars = [
      "denzel.png",
      "gable.png",
      "marlon-brando.png",
      "maryl-streep.png",
      "monroe.png",
      "poitier.png",
    ];

    const idx = Math.floor(Math.random() * 7);
    // const input = document.getElementById("user-input")
    let url = ''

    if (username === undefined) {
      url = `/images/${avatars[idx]}`
    } else {
      url = `https://github.com/${username}.png`;
    } 
    return url
  }

  return (
    <>
      <BackgroundWrapper>
        <CardForm>
          <LogoTitle>{appConfig.name}</LogoTitle>
          <Greetings>Welcome back {username} ;D</Greetings>
          <Form
            as="form"
            onSubmit={(eventInfo) => {
              eventInfo.preventDefault(); // For break default behavior of charge whole the page
              goTo.push(`/Home?username=${username}`);
            }}
          >
            {/* There are some warnings in this component, see later */}
            <LoginForm
              placeholder="Digite seu usuário github"
              textValue={username}
              btnLabel="Login"
              userTip="Digite seu usuário no github para carregar seu avatar."
              profileAvatar={randomAvatar()}
              // oninput={randomAvatar()}
              onchange={(event) => setUsername(event.target.value)}
              onclick={(eventClick) => {
                if (username.length < 3) {
                  window.alert("Insira um dado válido");
                  eventClick.preventDefault();
                }
              }}
            />
          </Form>
        </CardForm>
      </BackgroundWrapper>
    </>
  );
}
