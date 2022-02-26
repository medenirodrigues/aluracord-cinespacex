import { Text, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BtnSendSticker } from "./components/BtnSendSticker";
import { MessageList } from "./components/MessageList";
import {
  insertMessage,
  listeningMessageTable,
  refreshList,
} from "../services/supabase.api";
//import bootstrap from "./globalBootstrap";

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
// ------------------- CSS ↑ -----------------------

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const router = useRouter();  
  
  React.useEffect(() => {
    refreshList(setMessageList);
    
    listeningMessageTable((newMessage) => {
      setMessageList((currentListValue) => {
        return [newMessage, ...currentListValue];
      });
    });
  }, []);

  /**
   * This func is a handler to create 
   * the object message to be passed to insertMessage service.
   * @param {*} newMessage message passed by onClick event
   */ 
  function handlerMessage(newMessage) {
    const objMessage = {
      from: router.query.username,
      text: newMessage,
    };
    
    insertMessage([objMessage]);
    setMessage("");
  }

  return (
    <ChatBgWrapper>
      {/* Chat ↓ */}
      <ChatBox>
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