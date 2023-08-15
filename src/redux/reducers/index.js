import { createStore, applyMiddleware } from "redux";
import chatReducer from "./reducer";
import { compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const chatStore = createStore(
  chatReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default chatStore