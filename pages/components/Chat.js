import React from "react";
import { useRouter } from "next/router";

import appConfig from "../../config.json";
import styled from "styled-components";
import { BtnSendSticker } from "./BtnSendSticker";
import { MessageList } from "./MessageList";
import {
  insertMessage,
  listeningMessageTable,
  refreshList,
} from "../../services/supabase.api";

// ------------------- CSS ↓ -----------------------

const ChatStart = styled.button`
  position: fixed;
  top: 83vh;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  left: 88vw;
  display: inline; // inline
  color: white;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${appConfig.theme.colors.secondary["500"]};
`;
const ChatBox = styled.div`
  position: fixed;
  top: 19vh;
  left: 66vw;
  display: none;
  flex-direction: column;
  flex: 1;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  background-color: ${appConfig.theme.colors.neutrals["700"]};
  height: 100%;
  max-width: 30%;
  max-height: 80vh;
  padding: 15px;
  /* pointer-events: none; */
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
  width: 100%;
  align-items: center;
  border-radius: 5px;
  background-color: ${appConfig.theme.colors.neutrals["800"]};
`;
const MsgBox = styled.div`
  position: relative;
  flex-wrap: nowrap;
  display: flex;
  flex: 1;
  height: 80%;
  background-color: ${appConfig.theme.colors.neutrals["600"]};
  flex-direction: column;
  border-radius: 5px;
  padding: 16px;
`;
const ChatTextField = styled.input`
  width: 70%;
  height: 50px;
  border: 0;
  resize: none;
  border-radius: 6px;
  padding: 0px 0px 20px 5px;
  background-color: ${appConfig.theme.colors.neutrals["800"]};
  margin-right: 14px;
  color: ${appConfig.theme.colors.neutrals["200"]};
`;
// ------------------- CSS ↑ -----------------------//

export default function Chat() {
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

  function openedChat() {
    //document.getElementById()
  }

  return (
    <div onClick={openedChat}>
      <ChatStart className="material-icons">question_answer</ChatStart>
      <ChatBox>
        <ChatHeader>
          <h6 className="h6 text-light">Chat</h6>
          <button
            className="btn btn-danger btn-sm p-0 material-icons"
            href="/"
          >
            close
          </button>
        </ChatHeader>
        <MsgBox>
          <MessageList messages={messageList} />
          <ChatForm as="form" id="chat-form">
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
            <button
              id="send-btn"
              style={{ 
                marginRight: "8px",
              }}
              className="btn btn-primary btn-sm material-icons"
            >
              send
            </button>
          </ChatForm>
        </MsgBox>
      </ChatBox>
    </div>
  );
}
