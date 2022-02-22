import { Text, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BtnSendSticker } from "./components/BtnSendSticker";
import { MessageList } from "./components/MessageList";
import {
  returnedDtMessages,
  listenerMessages,
  orderList,
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
  const goTo = useRouter();

  listenerMessages(setMessage);

  function handlerMsg(newMessage) {
    const objMsg = {
      from: goTo.query.username,
      text: newMessage,
    };
    
    returnedDtMessages([objMsg]);
    setMessage("");
  }

  React.useEffect(() => {
    orderList(setMessageList);
    listenerMessages((newMessage) => {
      // ver isso
      setMessageList((cValue) => {
        console.log("cValue", cValue)
        return [newMessage, ...cValue];
      });
    });
  }, []);

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
                  handlerMsg(message);
                }
              }}
            />
            <BtnSendSticker
              onStickerClick={(chosenSticker) => {
                handlerMsg(":sticker: " + chosenSticker); // Seta Sticker diretamente na lista
                // setMessage(":sticker: " + chosenSticker) Seta sticker no textfield
              }}
            />
          </ChatForm>
        </MsgBox>
      </ChatBox>
    </ChatBgWrapper>
  );
}

// function MessageList(props) {
//   console.log(props)
//   return (
//     <MsgListUl>
//       {props.messages.map((currentMessage) => {
//         return (
//           <MsgListLi key={currentMessage.id}>
//             <LiHeader>
//               <LiImg src={`https://github.com/${currentMessage.from}.png`} />
//               <Text tag="strong">{currentMessage.from}</Text>
//               <ListSpan>{new Date().toLocaleDateString()}</ListSpan>
//               {/* Get created at from currentMessage  */}
//             </LiHeader>

//             {currentMessage.text.startsWith(":sticker:") ? (
//               <StickerImg src={currentMessage.text.replace(":sticker:", "")} />
//             ) : (
//               currentMessage.text
//             )}
//           </MsgListLi>
//         );
//       })}
//     </MsgListUl>
//   );
// }
