import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";

import { rootReducer } from "./store/index";

import Login from "./components/Login/Login";
import Home from "./containers/Home/Home";

import { fbAuth } from "./services/firebase";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { setLoggedUser } from "./store/loggedUser/actions";
import { LoggedUser } from "./store/loggedUser/types";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

fbAuth.onAuthStateChanged(user => {
  if (user) {
    console.log('Welcome', user.displayName);
    const loggedUser: LoggedUser = {
      name: user.displayName || 'Unknown User',
      email: user.email || 'unknown@user.com',
      photo: user.photoURL || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
      uid: user.uid,
    }
    store.dispatch(setLoggedUser(loggedUser));
  } else {
    console.log('No user logged in.');
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
