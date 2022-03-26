import React from "react";
import appConfig from "../../config.json";
import styled from "styled-components";

export default function BtnSendSticker(props) {
  const [isOpen, setOpenState] = React.useState("");

  const StickerButton = styled.button`
    border-radius: 50%;
    height: 20px;
    width: 20px;
    font-size: 20px;
    margin-top: 15px;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: ${isOpen ? "grayscale(0)" : "grayscale(1)"};
    &:hover {
      filter: "grayscale(0)";
    }
  `;
  const FrameBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    position: absolute;
    background-color: ${appConfig.theme.colors.neutrals["800"]};
    width: {
      xs: 200px;
      sm: 290px;
    }
    height: 300px;
    right: 50px;
    z-index: 1000;
    bottom: 60px;
    padding: 16px;
    box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
  `;
  const FrameUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1;
    padding-top: 16px;
    overflow: scroll;
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
  const FrameLi = styled.li`
    width: 50%;
    border-radius: 5px;
    padding: 10px;
    &:focus {
      background-color: ${appConfig.theme.colors.neutrals["600"]};
    }
    &:hover {
      background-color: ${appConfig.theme.colors.neutrals["600"]};
    }
  `;

  return (
    <div
      styleSheet={{
        position: "relative",
        display: "flex",
      }}
    >
      <StickerButton
        onClick={() => setOpenState(!isOpen)}
        className="me-3"
        onKeyPress={event => console.log(event.key)}
      >
        {/* adicionar uma forma de fechar o component tbm apertando "Esc" nesse keyPress */}
        {appConfig.emojiLabel}
      </StickerButton>
      
      {isOpen && (
        <FrameBox onClick={() => setOpenState(false)}>
          <h5 className="h5 text-light">Stickers</h5>
          <FrameUl>
            {appConfig.stickers.map((sticker) => (
              <FrameLi
                onClick={() => {
                  //console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                key={sticker}
              >
                <img className="img-fluid" src={sticker} />
              </FrameLi>
            ))}
          </FrameUl>
        </FrameBox>
      )}
    </div>
  );
}
