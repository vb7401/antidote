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
            <h1 style={loginStyle.title}>antidote</h1>
            <h2 style={loginStyle.subtitle}>for the procrastinator in us.</h2>
            <StyledFirebaseAuth
              className={loginStyle.button}
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
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: "0px",
    fontSize: "6vw",
  },
  subtitle: {
    margin: "0 0 1.5vw 0",
    fontSize: "1.75vw",
  },
  inner: {
    height: "15vw",
    width: "30vw",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "3vh",
  }
};
