import React from "react";
import Login from "./LoginPage/Login";
import MapView from "./MapViewContainer";
import BarViewContainer from "./BarViewContainer";
import CheckInView from "./CheckInViewContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";
import "../styles/App.css";
import { SET_USER_AUTH, SET_BAR_ID } from "../reducers/application";

export default function App() {
  const { state, dispatch } = useApplicationData();
  let auth = localStorage.getItem("authenticated");

  const setAuth = isAuthenticated => {
    dispatch({
      type: SET_USER_AUTH,
      auth: isAuthenticated
    });
  };

  const setBarId = id => {
    // Set state barId to id
    dispatch({
      type: SET_BAR_ID,
      auth: id
    });
  };

  const currentBar = (id, venues) => {
    return venues.find(venue => venue.id === id);
  };
  let currentBarObj = {};
  if (state.venues !== undefined) {
    currentBarObj = currentBar(state.barId, state.venues);
  }

  /**
   * TODO: pass down redirect component as nested so you can redirect from burger and infobox in mapview
   */
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {state.userAuth ? (
            <Redirect to="/map" />
          ) : (
            <Login setAuth={setAuth} />
          )}
        </Route>
        <Route exact path="/map">
          {!auth ? (
            <Redirect to="/" />
          ) : (
            <MapView
              setAuth={setAuth}
              barId={state.barId}
              setBarId={setBarId}
              bar={currentBarObj}
            />
          )}
        </Route>
        <Route exact path={`/bar/:${state.barId}`}>
          {!auth ? (
            <Redirect to="/" />
          ) : (
            <BarViewContainer setAuth={setAuth} bar={currentBarObj} />
          )}
        </Route>
        <Route exact path={`/bar/checkin/:${state.barId}`}>
          <CheckInView barId={state.barId} bar={currentBarObj} />
        </Route>
      </Switch>
    </Router>
  );
}
