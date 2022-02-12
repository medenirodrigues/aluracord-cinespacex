import React from "react";
import { useRouter } from "next/router";

import appConfig from "../config.json";
import {
  Box,
  Button,
  Text,
  TextField,
  Image,
  Icon,
} from "@skynexui/components";
import LoginForm from "./components/LoginForm";
import styled from "styled-components";

const BackgroundWrapper = styled.div`
  display: flex;
  align-items: left;
  background-image: url(https://reflectionofbcmlectures.files.wordpress.com/2013/09/old-skool-3d-cinema-audience.jpg);
  width: 50%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;
const CardForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.4%;
  flex-direction: column;
  width: 50%;
  height: 90%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  vertical-align: middle;
  max-width: 700px;
  padding: 85px 70px;
  background-color: ${appConfig.theme.colors.primary["500"]};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function LoginPage() {
  /***
   * através do destructuring ele cria a const username na qual ele seta a string passa no primeiro
   * momento que carrega o component, setUsername é criado e a ele é atribuido o método nativo do
   * React useState()
   */
  const [username, setUsername] = React.useState();
  /**
   * useRouter() é um método para gerenciamento de rotas no Next.js... adicionar mais dados relacionados ao
   * método
   */
  const goTo = useRouter();

  /**
   * [] Criar uma api que retorne o avatar de atores/atrizes caso o usuário ainda não esteja logado!
   */
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
    //console.log(avatars[idx])
    return avatars[idx];
  }

  return (
    // Adicionar Div geral
    <>
      <BackgroundWrapper>
        <CardForm>
          <Text
            variant="body3"
            styleSheet={{
              marginBottom: "32px",
              color: appConfig.theme.colors.neutrals[300],
            }}
          >
            {appConfig.name}
          </Text>
          <Titulo tag="h2">Welcome back! ;D</Titulo>
          <Box
            as="form"
            onSubmit={(eventInfo) => {
              // Cancela o comportamento padrão de carregar a págino ao mudar de rota
              eventInfo.preventDefault();
              goTo.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "80%", sm: "50%" },
              textAlign: "center",
            }}
          >
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
            {/* Photo Area */}
            {/* <Box
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "200px",
                marginBottom: "30px",
                padding: "16px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: "1px solid",
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: "10px",
                flex: 1,
                minHeight: "240px",
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
                src={
                  username === undefined
                    ? `/images/${randomAvatar()}`
                    : `https://github.com/${username}.png`
                }
                
              /> 
            </Box> */}
            {/* Photo Area */}
          </Box>

          <LoginForm
            placeholder="Digite seu usuário github"
            textValue={username}
            btnLabel="Login"
            title="Digite seu usuário no github para carregar seu avatar."
            onchange={(event) => setUsername(event.target.value)}
            onclick={(eventClick) => {
              console.log("entrei", username);
              if (username.length < 3) {
                window.alert("Insira um dado válido");
                eventClick.preventDefault();
              }
            }}
            src={
              username === undefined
                ? `/images/${randomAvatar()}`
                : `https://github.com/${username}.png`
            }
          />

          {/* <TextField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            // placeholder="Digite aqui seu nome de usuário no github"
            styleSheet={{
              width: "60%",
            }}
            textFieldColors={{
              neutral: {
                textColor: appConfig.theme.colors.neutrals[200],
                mainColor: appConfig.theme.colors.neutrals[900],
                mainColorHighlight: appConfig.theme.colors.primary[500],
                backgroundColor: appConfig.theme.colors.neutrals[800],
              },
            }}
          />
          <Button
            type="submit"
            label="Login"
            styleSheet={{
              width: "60%",
            }}
            onClick={(eventClick) => {
              if (username.length < 3) {
                window.alert("Insira um dado válido");
                eventClick.preventDefault();
              }
            }}
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[400],
              mainColorStrong: appConfig.theme.colors.primary[600],
            }}
          /> */}
        </CardForm>
      </BackgroundWrapper>
    </>
  );
}
