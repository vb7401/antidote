import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../Firebase";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/all",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/calendar.events"
      ]
    }
  ]
};

export default class Login extends React.Component {
  render() {
    return (
      <div style={loginStyle.outer}>
        <div style={loginStyle.inner}>
          <div>
            <h1>antidote</h1>
            <StyledFirebaseAuth
              style={loginStyle.button}
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const loginStyle = {
  outer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inner: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    borderRadius: "15px",
    padding: "20px",
    paddingBottom: "35px",
    width: "auto%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
};
