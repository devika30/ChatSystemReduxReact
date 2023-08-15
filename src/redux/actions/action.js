import {
  FETCH_SINGLE_CHAT,
  FETCH_CHAT_LIST_ITEMS,
  SEARCH_ITEMS,
  STORE_CHAT,
} from "./actiontype";
import mockData from "../../mock/api.json";

// export const fetch_all_chats = () => {
//   return function (dispatch) {
//     axios
//       .get("some api call")
//       .then((response) => {
//         dispatch(fetch_chat_items(response.data));
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };
// };

export const fetch_all_chats = () => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(fetch_chat_items(mockData));
    }, 1000);
  };
};

export const fetch_chat_items = (allData) => {
  return {
    type: FETCH_CHAT_LIST_ITEMS,
    payload: allData,
  };
};

export const fetch_single_chat = (id) => {
  return {
    type: FETCH_SINGLE_CHAT,
    payload: id,
  };
};

export const add_chat = (chat) => {
  return {
    type: STORE_CHAT,
    payload: chat,
  };
};

export const fetch_search_chats = (query) => {
  return {
    type: SEARCH_ITEMS,
    payload: query,
  };
};
