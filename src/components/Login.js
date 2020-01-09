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
          <h2>antidote</h2>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  }
}

const loginStyle = {
  outer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inner: {
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    width: "auto"
  }
};
