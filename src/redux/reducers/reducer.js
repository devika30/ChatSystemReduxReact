import {
  FETCH_SINGLE_CHAT,
  FETCH_CHAT_LIST_ITEMS,
  SEARCH_ITEMS,
  STORE_CHAT,
} from "../actions/actiontype";

const initialState = {
  sitename: "CHATS",
  allChats: [],
  singleChatInfo: "",
  searchQuery: "",
  filteredChats: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_LIST_ITEMS:
      return {
        ...state,
        allChats: action.payload,
      };
    case SEARCH_ITEMS:
      const filteredChats = state.allChats.filter((singlequery) =>
        singlequery.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (action.payload === "") {
        return {
          ...state,
          filteredChats: filteredChats,
        };
      }
      return {
        ...state,
        allChats: state.allChats,
        filteredChats: action.payload === "" ? null : filteredChats,
      };
    case FETCH_SINGLE_CHAT:
      return {
        ...state,
        singleChatInfo: state.allChats.find((singleChat) => {
          return singleChat.id === action.payload;
        }),
      };
    case STORE_CHAT:
      const selectedChatId = state.singleChatInfo
        ? state.singleChatInfo.id
        : null;
      return {
        ...state,
        allChats: state.allChats.map((chat) => {
          if (chat.id === selectedChatId) {
            return {
              ...chat,
              messageList: [...chat.messageList, action.payload],
            };
          }
          return chat;
        }),
        singleChatInfo: {
          ...state?.singleChatInfo,
          messageList: [...state?.singleChatInfo?.messageList, action.payload],
        },
      };
    default:
      return state;
  }
};

export default chatReducer;
