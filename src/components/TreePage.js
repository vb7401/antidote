import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Todo from "./Todo";
import firebase from "../Firebase";
import uuid from "uuid";
import {cloneDeep} from 'lodash';

import Grid from "@material-ui/core/Grid";

let db = firebase.firestore();

export default class TreePage extends React.Component {
  state = {
    todos: [
      {
        title: null,
        links: [{
          label: "tasks",
          sublabel: "",
          path: "all"
        }]
      },
    ],
    user: null
  };

  componentDidMount() {
    let self = this;
    
    // set user
    self.setState({user: self.props.user});

    // load data from user OR start new doc
    var docRef = db.collection("users").doc(self.props.user);
    docRef.get().then(function(doc) {
      if (!doc.exists) {
        docRef.set({todos: self.state.todos});
      } else {
        self.setState({todos: doc.data().todos});
      }
    });
  }

  handleAddTodo = todo => {
    var self = this;

    // fix todo.pathEl
    todo.pathEl.push({ ind: todo.label });
    if (todo.sublabel !== "") {
      todo.pathEl.push({ ind: todo.sublabel });
    }
    todo.pathEl.push({ ind: "" });

    // generate links array
    var links = [];
    var path = "";
    for (let i = 0; i < todo.pathEl.length - 2; i++) {
      path += i === 0 ? "" : "/";
      path += todo.pathEl[i].ind;
      links.push({
        path: path,
        label: todo.pathEl[i+1].ind,
        sublabel: todo.pathEl[i+2].ind
      });
    }

    // add new todo
    let cop = cloneDeep(this.state.todos)
    cop.push({
      key: uuid.v4(),
      title: todo.title,
      done: false,
      time: todo.time,
      deadline: todo.deadline,
      links: links
    });

    // reset STATE
    this.setState({ todos: cop });
    var docRef = db.collection("users").doc(this.props.user);
    docRef.set({todos: cop});
  };

  handleCheckTodo = (tid) => {
    // check new todo
    let cop = cloneDeep(this.state.todos)
    var todo = cop.find(d => d.key === tid)
    todo.done = !todo.done
    
    // reset STATE
    this.setState({todos: cop})
    var docRef = db.collection("users").doc(this.props.user);
    docRef.set({todos: cop});
  }

  handleDeleteTodo = (tid) => {
    // remove todo
    let cop = cloneDeep(this.state.todos)
    cop = cop.filter(d => d.key !== tid)

    // reset STATE
    this.setState({todos: cop})
    var docRef = db.collection("users").doc(this.props.user);
    docRef.set({todos: cop});
  }

  handleEditTodo = (tid, todo) => {
    var self = this;

    // fix todo.pathEl
    todo.pathEl.push({ ind: todo.label });
    if (todo.sublabel !== "") {
      todo.pathEl.push({ ind: todo.sublabel });
    }
    todo.pathEl.push({ ind: "" });

    // generate links array
    var links = [];
    var path = "";
    for (let i = 0; i < todo.pathEl.length - 2; i++) {
      path += i === 0 ? "" : "/";
      path += todo.pathEl[i].ind;
      links.push({
        path: path,
        label: todo.pathEl[i+1].ind,
        sublabel: todo.pathEl[i+2].ind
      });
    }

    // add new one + delete old
    let cop = cloneDeep(this.state.todos)
    cop.push({
      key: uuid.v4(),
      title: todo.title,
      done: false,
      time: todo.time,
      deadline: todo.deadline,
      links: links
    });
    cop = cop.filter(d => d.key !== tid)

    // update STATE
    this.setState({todos: cop})
    var docRef = db.collection("users").doc(this.props.user);
    docRef.set({todos: cop});
  }

  generateDisplay = (todos) => {
    var toDisplay = []
    
    for (let i = 0; i < todos.length; i++) {
      var links = todos[i].links
      var pathEl = []
      
      pathEl.push({
        ind: "all",
        prefix: "all"
      })
      
      for (let j = 0; j < links.length; j++) {
        pathEl = [...pathEl]
        
        // here we are generating pathEl with some jank syntax
        if (j !== 0) {
          pathEl.push({
            ind: links[j-1].label,
            prefix: links[j].path
          })
        }
        
        if (!toDisplay.some(d => d.path === links[j].path)) {
          // if the path is not in toDisplay, add it
          toDisplay.push({
            path: links[j].path,
            pathEl: pathEl,
            labels: [links[j].label]
          })
        } else {
          // find where the path is in toDisplay
          let el = toDisplay.find(d => d.path === links[j].path)
          // if the current label not in path, add it to labels
          if (!el.labels.includes(links[j].label)) {
            el.labels.push(links[j].label)
          }
        }
      }
    }
    
    return toDisplay
  }

  render() {
    var toDisplay = this.generateDisplay(this.state.todos)
    return toDisplay.map(d => (
      <Route exact path={`/${d.path}`}>
        <Header path={d.path} pathEl={d.pathEl} />

        <Grid container>
          {d.labels.map(label => (
            <Grid item xs={12} md={4}>
              <Todo
                todos={this.state.todos}
                done={toDisplay.some(td => td.path === (d.path + "/" + label))}
                pathEl={d.pathEl}
                path={d.path}
                label={label}
                addTodo={this.handleAddTodo.bind(this)}
                deleteTodo={this.handleDeleteTodo.bind(this)}
                checkTodo={this.handleCheckTodo.bind(this)}
                editTodo={this.handleEditTodo.bind(this)}
              />
            </Grid>
          ))}
        </Grid>
      </Route>
    ));
  }
}
