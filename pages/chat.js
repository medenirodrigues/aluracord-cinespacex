import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { BtnSendSticker } from "./components/BtnSendSticker";
//import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { returnedDtMessages, rtListenerMessages, orderList } from "../services/supabase.api";
//import bootstrap from "./globalBootstrap";

import { BackgroundWrapper } from "./index";
import styled from "styled-components";

// ------------------- CSS ↓ -----------------------
const ChatBgWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
  background-image: url(https://reflectionofbcmlectures.files.wordpress.com/2013/09/old-skool-3d-cinema-audience.jpg);
  color: ${appConfig.theme.colors.neutrals["000"]};
  background-color: ${appConfig.theme.colors.primary["500"]};
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  background-color: ${appConfig.theme.colors.neutrals["700"]};
  height: 100%;
  max-width: 30%;
  max-height: 80vh;
  padding: 15px;
`;

const ChatHeader = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatForm = styled.form`
  display: flex;
  align-items: center;
`;

const MsgBox = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 80%;
  background-color: ${appConfig.theme.colors.neutrals["600"]};
  flex-direction: column;
  border-radius: 5px;
  padding: 16px;
`;

const MsgListUl = styled.ul`
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  color: ${appConfig.theme.colors.neutrals["000"]};
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: ${appConfig.theme.colors.neutrals[
      "700"
    ]}; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${appConfig.theme.colors.neutrals[
      "600"
    ]}; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid ${appConfig.theme.colors.neutrals["800"]}; /* creates padding around scroll thumb */
  }
`;

const MsgListLi = styled.li`
  border-radius: 5px;
  padding: 6px;
  margin-bottom: 12px;
  &:hover {
    background-color: ${appConfig.theme.colors.neutrals["700"]};
  }
`;

const LiHeader = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const LiImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`;

const ListSpan = styled.span`
  font-size: 10px;
  color: ${appConfig.theme.colors.neutrals["300"]};
  align-self: flex-start;
`;

const ChatTextField = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  resize: none;
  border-radius: 6px;
  padding: 0px 0px 20px 5px;
  background-color: ${appConfig.theme.colors.neutrals["800"]};
  margin-right: 14px;
  color: ${appConfig.theme.colors.neutrals["200"]};
`;

const StickerImg = styled.img`
  width: 30%;
  border-radius: 5px;
  padding: 10px;
`;

// ------------------- CSS ↑ -----------------------

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const goTo = useRouter();

  // function rtListenerMessages(setMessage) {
  //   return sbClient
  //     .from("messages")
  //     .on("INSERT", (newQuote) => {
  //       console.log("há uma nova mensagem", newQuote.new);
  //       setMessage(newQuote.new);
  //     })
  //     .subscribe();
  // }

    rtListenerMessages(setMessage);

  // Array trackeia possvíes alterações de estado que precisam refletir e executa o código contido
  function handlerMessage(newMessage) {
    const objMessage = {
      // id : messageList.length;
      from: goTo.query.username,
      text: newMessage,
    };

    returnedDtMessages([objMessage])

    // sbClient
    //   .from("messages")
    //   .insert([objMessage])
    //   // ↓ O then() aqui retorna uma response da inserção feita acima.
    //   .then((data) => {
    //     console.log(data);
    //   });

    setMessage("");
  }

  React.useEffect(() => {
    orderList(setMessageList)
    rtListenerMessages((newMessage) => {
      // ver isso
      setMessageList((cValue) => {
        return [newMessage, ...cValue];
      });
    });
  
  }, []);

  return (
    <ChatBgWrapper>
      {/* Chat ↓ */}
      <ChatBox className="">
        <ChatHeader>
          <h6>Chat</h6>
          <Button
            variant="tertiary"
            colorVariant="neutral"
            label="Logout"
            href="/"
          />
        </ChatHeader>
        <MsgBox>
          <MessageList messages={messageList} />
          <ChatForm as="form">
            <ChatTextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handlerMessage(message);
                }
              }}
            />
            <BtnSendSticker
              onStickerClick={(chosenSticker) => {
                //console.log(chosenSticker)
                handlerMessage(":sticker: " + chosenSticker); // Seta Sticker diretamente na lista
                // setMessage(":sticker: " + chosenSticker) Seta sticker no textfield
              }}
            />
          </ChatForm>
        </MsgBox>
      </ChatBox>
    </ChatBgWrapper>
  );
}

function MessageList(props) {
  return (
    <MsgListUl>
      {props.messages.map((currentMessage) => {
        return (
          <MsgListLi key={currentMessage.id}>
            <LiHeader>
              <LiImg src={`https://github.com/${currentMessage.from}.png`} />
              <Text tag="strong">{currentMessage.from}</Text>
              <ListSpan>{new Date().toLocaleDateString()}</ListSpan>
            </LiHeader>

            {currentMessage.text.startsWith(":sticker:") ? (
              <StickerImg src={currentMessage.text.replace(":sticker:", "")} />
            ) : (
              currentMessage.text
            )}
          </MsgListLi>
        );
      })}
    </MsgListUl>
  );
}
