import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { BtnSendSticker } from "./src/components/BtnSendSticker";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_ANON_PUBLIC =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjA1NCwiZXhwIjoxOTU5MTI4MDU0fQ.jOFoJHkM3QZ-90MtskDLQpQGLjyEbXP_BBTgYxT9z1o";
const SUPABASE_URL = "https://syrabaclfultwbmoygvl.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC);

export default function ChatPage() {

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const goTo = useRouter();

  /**
   * O useEffect()...
   */
  React.useEffect(() => {
    console.log('useEffect')
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { acending: false })
      .then((supaResponse) => {
        if (supaResponse.status === 200) setMessageList(supaResponse.data);
      });
  }, []);
  // Array trackeia possvíes alterações de estado que precisam refletir e executa o código contido

  

  function handlerMessage(newMessage) {
    const objMessage = {
      // id : messageList.length;
      from: goTo.query.username,
      text: newMessage
    };

    //console.log(objMessage)
    
    supabaseClient
        .from("messages")
        .insert([objMessage])
        // ↓ O then() aqui retorna uma response da inserção feita acima.
        .then(({ data }) => {
          // essa o dado adicionado é retornado e já inserido no arrays com o setMessagelist()
          setMessageList([data[0], ...messageList]);
        });

    setMessage("");
  }


  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://reflectionofbcmlectures.files.wordpress.com/2013/09/old-skool-3d-cinema-audience.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messageList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
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
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <BtnSendSticker onStickerClick={(chosenSticker) => {
              //console.log(chosenSticker)
              setMessage(":sticker: " + chosenSticker)
            }} />

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messages.map((currentMessage) => {
        return (
          <Text
            key={currentMessage.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${currentMessage.from}.png`}
              />
              <Text tag="strong">{currentMessage.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {currentMessage.text.startsWith(":sticker:")? (
              <Image 
                src={currentMessage.text.replace(":sticker:", "")}
                styleSheet={{
                  width: '10%',
                  borderRadius: '5px',
                  padding: '10px',
                }}
               />
            ) : currentMessage.text }
          </Text>
        );
      })}
    </Box>
  );
}
