import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_single_chat, fetch_all_chats } from "../../redux/actions/action";
import { NavLink } from "react-router-dom";
import ChatItem from "../ChatItem/ChatItem";
import "./chatlist.css";
import Search from "../SearchBar/Search";
import moment from "moment-timezone";

export const formatDate = (inputDate) => {
  const tzDate = moment(inputDate)
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format();
  let dt = new Date(tzDate),
    date = dt.getDate(),
    diffDays = new Date().getDate() - date,
    diffMonths = new Date().getMonth() - dt.getMonth(),
    diffYears = new Date().getFullYear() - dt.getFullYear();
  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    return `Today`;
  } else if (diffYears === 0 && diffDays === 1) {
    return `Yesterday`;
  } else {
    return `${moment(tzDate).format("D/MM/YY")}`;
  }
};

function ChatList() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_all_chats());
  }, []);
  const { filteredChats, allChats } = useSelector((state) => state);
  const getSingleChat = (chatId) => {
    setSelectedChatId(chatId);
    dispatch(fetch_single_chat(chatId));
  };
  return (
    <div className="main-content-div">
      <div className="chat-list-div">
        <Search />

        {filteredChats === null
          ? allChats.map((chat) => (
              <div key={chat.id} onClick={() => getSingleChat(chat.id)}>
                <div className="content-div">
                  <div className="image-div">
                    <img className="image" src={chat.imageURL} />
                  </div>
                  <div className="information-div">
                    <p>{chat.title}</p>
                    <p>{chat.orderId}</p>
                  </div>
                  <div className="date-div">
                    <p>{formatDate(chat?.latestMessageTimestamp)}</p>
                  </div>
                </div>
                <hr />
              </div>
            ))
          : filteredChats.map((chat) => (
              <div key={chat.id} onClick={() => getSingleChat(chat.id)}>
                <div className="content-div">
                  <div className="image-div">
                    <img className="image" src={chat.imageURL} />
                  </div>
                  <div className="information-div">
                    <p>{chat.title}</p>
                    <p>{chat.orderId}</p>
                  </div>
                  <div className="date-div">
                    <p>{formatDate(chat?.latestMessageTimestamp)}</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}

        {}
      </div>
      {selectedChatId && (
        <div className="chat-item-div">
          <ChatItem />
        </div>
      )}
    </div>
  );
}

export default ChatList;
