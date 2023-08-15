import React, { useState } from "react";
import { add_chat } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import "./chatinput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

function ChatInput() {
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();

  const randomString = (prefix) =>
    Math.random()
      .toString(36)
      .replace("0.", prefix || "");

  const getMessage = () => {
    const mssg = {
      messageId: randomString("msg-"),
      message: userInput,
      timestamp: Date.now(),
      sender: "USER",
      messageType: "text",
    };
    dispatch(add_chat(mssg));
    setUserInput("");
  };

  return (
    <div className="input-div">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type a message"
      />
      <div className="submit-btn-div">
        <button className="submit-btn" onClick={getMessage}>
        <FontAwesomeIcon className="icon-send" icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
