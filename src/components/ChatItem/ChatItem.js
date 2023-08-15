import React from "react";
import "./chatitem.css";
import ChatInput from "../ChatInput/ChatInput";
import { add_chat } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";

export const randomString = (prefix) =>
  Math.random()
    .toString(36)
    .replace("0.", prefix || "");

function ChatItem() {
  const chat = useSelector((state) => state.singleChatInfo);
  const dispatch = useDispatch();
  const sendMessage = (message) => {
    if (message === "Request a callback") {
      const mssg = {
        messageId: randomString("msg-"),
        message: "I want a callback",
        timestamp: Date.now(),
        sender: "USER",
        messageType: "text",
      };
      dispatch(add_chat(mssg));
    }
  };

  return (
    <div className="chat-item-outer-div">
      <div className="chat-title-div">
        <div className="chat-item-image-url-div">
          <img src={chat?.imageURL} className="chat-img" />
        </div>
        <div style={{ margin: "5px" }}>
          <p>{chat.title}</p>
        </div>
      </div>
      <hr />

      <div className="message-div">
        {chat.messageList.map((message, index) => (
          <div
            key={index}
            className={`chat-title-div ${
              message.sender === "BOT" ? "botMessage" : "userMessage"
            }`}
          >
            {message.messageType === "optionedMessage" ? (
              <div>
                <p style={{ wordBreak: "break-all" }}>{message.message}</p>
                <br />
                {message.options?.map((option) => (
                  <div
                    className="option-text-subtext-div"
                    key={option.optionText}
                  >
                    <p
                      className="optioned-text"
                      onClick={() => sendMessage(option.optionText)}
                    >
                      {option.optionText}
                    </p>
                    <p className="sub-text">{option.optionSubText}</p>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <p>{message.message}</p>
            )}
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatItem;
