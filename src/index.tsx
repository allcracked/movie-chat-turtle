import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import { rootReducer } from "./store/index";

import Login from "./components/Login/Login";
import Home from "./containers/Home/Home";
import SecureRoute from "./components/SecureRoute/SecureRoute";

import { fbAuth } from "./services/firebase";
import { setLoggedUser } from "./store/loggedUser/actions";
import { LoggedUser } from "./store/loggedUser/types";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

const store = createStore(rootReducer);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <SecureRoute exact path="/home" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

fbAuth.onAuthStateChanged((user) => {
  if (user) {
    const loggedUser: LoggedUser = {
      name: user.displayName || "Unknown User",
      email: user.email || "unknown@user.com",
      photo:
        user.photoURL ||
        "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
      uid: user.uid,
    };
    store.dispatch(setLoggedUser(loggedUser));
    history.push("/home");
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
