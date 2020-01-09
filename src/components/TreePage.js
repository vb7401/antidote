import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Todo from "./Todo";
import firebase from "../Firebase";

import Grid from "@material-ui/core/Grid";

/*
  - todos:
    - key       (uuid)
    - title     (str)
    - done      (bool)
    - priority  (int)
    - deadline  (date)
    - links: 
      - all possible [key, label, path, sublabel]

  - display:
    - key       (uuid)
    - label     (str)
    - labels    (bool)
    - children:
      - [key, label, labels, children]
*/

export default class TreePage extends React.Component {
  state = {
    toDisplay: [],
    display: {
      label: "all",
      labels: ["tasks", "school", "goals"],
      children: []
    },
    todos: [],
    user: {}
  };

  componentDidMount() {
    let self = this
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          user: user.uid
        })
        
        let db = firebase.firestore()
        var docRef = db.collection("users").doc(self.state.user)
        docRef.get().then(function(doc) {
          if (doc.exists) {
            self.setState({
              display: doc.data().display,
              todos: doc.data().todos,
              toDisplay: generateStrings(doc.data().display)
            })
          } else {
            docRef.set({
              display: {
                label: "all",
                labels: ["tasks", "school", "goals"],
                children: []
              },
              todos: []
            })
          }
        })
      }
    });

    this.setState(state => ({
      toDisplay: generateStrings(state.display)
    }));
  }

  handleCheckTodo() {
    
  }

  render() {
    return this.state.toDisplay.map(d => (
      <Route exact path={`/${d.path}`}>
        <Header path={d.path} pathEl={d.pathEl} />

        <Grid container>
          {d.labels.map(label => (
            <Grid item xs={4}>
              <Todo todos={this.state.todos} path={d.path} label={label} />
            </Grid>
          ))}
        </Grid>
      </Route>
    ));
  }
}

function generateStrings(data) {
  var ret = [];

  // recursively generate child pages
  var gen = data.children.map(d => generateStrings(d));
  gen.forEach(x => (ret = ret.concat(x)));

  // add new label to path
  ret = ret.map(d => ({
    path: `${data.label}/${d.path}`,
    pathEl: [
      {
        ind: data.label,
        prefix: data.label
      }
    ].concat(
      d.pathEl.map(e => ({
        ind: e.ind,
        prefix: data.label + "/" + e.prefix
      }))
    ),
    labels: d.labels
  }));

  // add base case
  ret.push({
    path: `${data.label}`,
    pathEl: [
      {
        ind: data.label,
        prefix: data.label
      }
    ],
    labels: data.labels
  });

  return ret;
}
