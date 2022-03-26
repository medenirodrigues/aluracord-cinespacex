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
  max-width: 700px;
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

// function Titulo(props) {
//   const Tag = props.tag || "h1";
//   return (
//     <>
//       <Tag>{props.children}</Tag>
//       <style jsx>{`
//         ${Tag} {
//           color: ${appConfig.theme.colors.neutrals["000"]};
//           font-size: 24px;
//           font-weight: 600;
//         }
//       `}</style>
//     </>
//   );
// }

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
    return avatars[idx];
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
              // Cancela o comportamento padrão de carregar a págino ao mudar de rota
              eventInfo.preventDefault();
              goTo.push(`/Home?username=${username}`);
            }}
          >
            <LoginForm
              placeholder="Digite seu usuário github"
              textValue={username}
              btnLabel="Login"
              title="Digite seu usuário no github para carregar seu avatar."
              onchange={(event) => setUsername(event.target.value)}
              onclick={(eventClick) => {
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
          </Form>
        </CardForm>
      </BackgroundWrapper>
    </>
  );
}
