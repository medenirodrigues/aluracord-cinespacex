import React from "react";
import appConfig from "../../config.json";
import styled from "styled-components";

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
  margin-right: 10px;
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
const StickerImg = styled.img`
  width: 30%;
  border-radius: 5px;
  padding: 10px;
`;

export function MessageList(props) {
    return (
      <MsgListUl>
        {props.messages.map((currentMessage) => {
          return (
            <MsgListLi key={currentMessage.id}>
              <LiHeader>
                <LiImg src={`https://github.com/${currentMessage.from}.png`} />
                <h6>{currentMessage.from}</h6>
                <ListSpan>{new Date().toLocaleDateString()}</ListSpan>
                {/* Get created at from currentMessage  */}
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
