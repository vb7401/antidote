import React from "react";
import { Link } from "react-router-dom";
import TodoList from "./TodoList";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";

export default function Todo(props) {
  var display = formatTodos(props);
  return (
    <React.Fragment>
      <Paper style={todoStyle.note}>
        <div>
          <Link style={todoStyle.link} to={`/${props.path}/${props.label}`}>
            <b>{props.label}</b>
          </Link>
          <AddIcon style={todoStyle.add} fontSize="small" />
        </div>
        <TodoList todos={display} />
      </Paper>
    </React.Fragment>
  );
}

function formatTodos(props) {
  // first filter out links for path
  var ret = props.todos.map(e => ({
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
    padding: "16px",
    margin: "16px",
    // background: "#C06C84",
    background: "linear-gradient(90deg,#fce3ec,#ffe8cc)",
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
    color: "black"
  },
  add: {
    float: "right"
  }
};
