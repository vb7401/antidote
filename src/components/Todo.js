import React, { useState } from "react";
import {Link} from "react-router-dom";
import TodoList from "./TodoList.js"

import Paper from "@material-ui/core/Paper";
import AddIcon from '@material-ui/icons/Add';

export default function Todo(props) {
  return (
    <React.Fragment>
      <Paper style={todoStyle.note}>
        <div>
          <Link style={todoStyle.link} to={`/${props.path}/${props.label}`}>
            {props.label}
          </Link>
          <AddIcon style={todoStyle.add} fontSize="small"/> 
        </div>
        <TodoList todos={props.todos} />
      </Paper>
    </React.Fragment>
  );
}

const todoStyle = {
  note: {
    padding: "16px",
    margin: "16px",
  },
  link: {
    textDecoration: 'underline',
    color: 'black',
    textAlign: "center",
  },
  add: {
    float: 'right',
  }
};
