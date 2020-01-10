import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Todo from "./Todo";
import firebase from "../Firebase";
import uuid from "uuid";

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
      - for l in labels:
        - [l.key, l, l.labels, l.children]
*/

let db = firebase.firestore();

export default class TreePage extends React.Component {
  state = {
    toDisplay: [],
    display: {
      label: "all",
      labels: ["tasks", "school", "goals"],
      children: [
        {
          label: "tasks",
          labels: [],
          children: []
        },
        {
          label: "school",
          labels: [],
          children: []
        },
        {
          label: "goals",
          labels: [],
          children: []
        }
      ]
    },
    todos: [],
    user: {}
  };

  componentDidMount() {
    let self = this;

    self.setState({
      user: self.props.user
    });

    var docRef = db.collection("users").doc(self.props.user);
    docRef.get().then(function(doc) {
      if (!doc.exists) {
        docRef.set({
          display: self.state.display,
          todos: []
        });
        self.setState({
          toDisplay: generateStrings(self.state.display)
        });
      } else {
        self.setState({
          display: doc.data().display,
          todos: doc.data().todos,
          toDisplay: generateStrings(doc.data().display)
        });
        console.log(doc.data().todos)
      }
    });
  }

  handleAddSublabel = todo => {
    var docRef = db.collection("users").doc(this.props.user);

    var cop = JSON.parse(JSON.stringify(this.state.display))
    var dfs = cop.children;

    // recurse down into todo data
    for (let i = 1; i < todo.pathEl.length - 1; i++) {
      dfs = dfs.find(d => d.label === todo.pathEl[i].ind);
      dfs = dfs.children;
    }

    // locate child with the same label
    dfs = dfs.find(d => d.label === todo.label);

    // check if sublabel is already in labels,
    // otherwise add it
    if (!dfs.labels.includes(todo.sublabel)) {
      dfs.labels.push(todo.sublabel);
      dfs.children.push({
        label: todo.sublabel,
        labels: [],
        children: []
      });
    }

    // add new sublabel to our display
    this.setState({
      display: cop,
      toDisplay: generateStrings(cop)
    });

    // add new sublabel to users data
    docRef.get().then(function(doc) {
      docRef.set({
        ...doc.data(),
        display: cop
      });
    });
  };

  handleAddTodo = todo => {
    // users data
    var self = this;
    var docRef = db.collection("users").doc(this.props.user);

    // add label to pathEl, as it doesn't include it originally
    todo.pathEl.push({ ind: todo.label });

    if (todo.sublabel !== "") {
      // checks if new sublabel needs to be added
      this.handleAddSublabel(todo)

      // add new sublabel to pathEl
      todo.pathEl.push({ ind: todo.sublabel });
    }

    // add blank sublabel at end, as everything ends in blank
    todo.pathEl.push({ ind: "" });

    // generate links array
    var links = [];
    var path = "";
    for (let i = 0; i < todo.pathEl.length - 1; i++) {
      path += i === 0 ? "" : "/";
      path += todo.pathEl[i].ind;
      links.push({
        path: path,
        label: todo.pathEl[i].ind,
        sublabel: todo.pathEl[i + 1].ind
      });
    }

    var newTodo = {
      key: uuid.v4(),
      title: todo.title,
      done: false,
      priority: todo.priority,
      deadline: todo.deadline,
      links: links
    };

    // add new todo to our local state to refresh
    this.setState({ todos: [...this.state.todos, newTodo] });

    // add new todo to firebase
    docRef.get().then(function(doc) {
      docRef.set({
        ...doc.data(),
        todos: [...doc.data().todos, newTodo]
      });
    });
  };

  render() {
    console.log(this.state.toDisplay)
    return this.state.toDisplay.map(d => (
      <Route exact path={`/${d.path}`}>
        <Header path={d.path} pathEl={d.pathEl} />

        <Grid container>
          {d.labels.map(label => (
            <Grid item xs={4}>
              <Todo
                todos={this.state.todos}
                done={true}
                pathEl={d.pathEl}
                path={d.path}
                label={label}
                addTodo={this.handleAddTodo.bind(this)}
              />
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
