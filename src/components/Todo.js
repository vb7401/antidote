import React, { useState } from "react";
import { Link } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

/*
  - todo:
    - key       (uuid)
    - title     (str)
    - priority  (int)
    - deadline  (date)
    - label
    - sublabel
    - pathEl:
*/

export default function Todo(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Paper style={todoStyle.note}>
        <div style={todoStyle.toprow}>
          <div>
            {props.done ? (
              <Link style={todoStyle.link} to={`/${props.path}/${props.label}`}>
                <b>{props.label}</b>
              </Link>
            ) : (
              <b>{props.label}</b>
            )}
          </div>

          <div>
            <IconButton onClick={handleClickOpen} style={todoStyle.add}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <TodoList todos={formatTodos(props)} />

        <AddTodo
          label={props.label}
          handleClose={handleClose}
          addTodo={(todo) => props.addTodo(todo)}
          open={open}
          pathEl={props.pathEl}
        />
      </Paper>
    </React.Fragment>
  );
}

function formatTodos(props) {
  var ret = []

  // first filter out links for path
  ret = props.todos.map(e => ({
    title: e.title,
    links: e.links.filter(
      el => el.path === props.path && el.label === props.label
    )
  }));

  // remove all todos that have no links with this path
  ret = ret.filter(e => e.links.length !== 0);

  // reformat
  return ret.map(e => ({
    title: e.title,
    label: e.links[0].label,
    sublabel: e.links[0].sublabel
  }));
}

const todoStyle = {
  note: {
    padding: "10px",
    margin: "16px",
    // background: "#C06C84",
    background: "linear-gradient(90deg,#fce3ec,#ffe8cc)"
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
    color: "black"
  },
  add: {
    margin: "none",
    float: "right"
  },
  toprow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};
