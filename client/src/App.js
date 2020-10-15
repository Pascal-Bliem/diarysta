import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Entries from "./components/pages/Entries";
import Calendar from "./components/pages/Calendar";
import Stats from "./components/pages/Stats";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import About from "./components/pages/About";
import LocaleState from "./context/locale/LocaleState";
import AuthState from "./context/auth/AuthState";
import EntryState from "./context/entry/EntryState";


// load token into global headers
if (localStorage.getItem("diarysta_user_token")) {
  setAuthToken(localStorage.getItem("diarysta_user_token"));
}

function App() {
  useEffect(() => {
    // initializes Materialize JavaScript
    M.AutoInit();
    //  eslint-ignore-next-line
  }, []);

  return (
  <EntryState>
    <LocaleState>
      <AuthState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/entries" component={Entries} />
              <PrivateRoute exact path="/calendar" component={Calendar} />
              <PrivateRoute exact path="/stats" component={Stats} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/"
                component={() => <Redirect to="/entries" />}
              />
            </Switch>
          </div>
        </Router>
      </AuthState>
    </LocaleState>
  </EntryState>
  );
}

export default App;
