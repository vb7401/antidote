import React from "react";
import Header from "./Header";
import { firebase, config } from "../Firebase";

export default class Recommendation extends React.Component {
  startAPI = () => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    script.onload = e => {
      function start() {
        window.gapi.client
          .init({
            apiKey: config.apiKey,
            discoveryDocs: config.discoveryDocs,
            clientId: config.clientID,
            scope: config.scopes
          })
      }
      window.gapi.load("client", start)
      window.gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        console.log(response.result.items);
      });
    };
  };

  componentDidMount() {
    this.startAPI();
  }

  render() {
    return <Header todo={false} path={"recommendations"} />;
  }
}
