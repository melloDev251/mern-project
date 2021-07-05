import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

// dev tools navigateur
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
