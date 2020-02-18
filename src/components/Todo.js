import React, { useState } from "react";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { wait } from "@testing-library/react";

export default function Todo(props) {
  var formattedTodos = formatTodos(props);
  formattedTodos.sort(compareTodo);

  // don't show if on main page
  const [minOpen, setMinOpen] = React.useState(props.path !== "all");
  const [addOpen, setAddOpen] = React.useState(false);
  const [doneShow, setDoneShow] = React.useState(false);

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleMinOpen = () => {
    setMinOpen(true);
  };
  const handleMinClose = () => {
    setMinOpen(false);
  };
  const toggleDoneShow = () => {
    setDoneShow(!doneShow);
  };

  return (
    <React.Fragment>
      <Paper style={todoStyle.note}>
        <div style={todoStyle.toprow}>
          <div>
            {minOpen ? (
              <IconButton onClick={handleMinClose} style={todoStyle.add}>
                <ExpandLessIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={handleMinOpen} style={todoStyle.add}>
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            )}
          </div>

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
            <IconButton onClick={toggleDoneShow} style={todoStyle.add}>
              <DoneAllIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleClickAddOpen} style={todoStyle.add}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        <AddTodo
          label={props.label}
          handleClose={handleAddClose}
          addTodo={todo => props.addTodo(todo)}
          open={addOpen}
          pathEl={props.pathEl}
        />

        <Collapse in={minOpen} timeout="auto" unmountOnExit>
          <div style={todoStyle.form}>

            {formattedTodos.map(d =>
              !d.done ? (
                <TodoItem
                  todo={d}
                  addTodo={todo => props.addTodo(todo)}
                  deleteTodo={tid => props.deleteTodo(tid)}
                  checkTodo={tid => props.checkTodo(tid)}
                  editTodo={(tid, todo) => props.editTodo(tid, todo)}
                  pathEl={props.pathEl}
                />
              ) : (
                ""
              )
            )}

            <Collapse in={doneShow} timeout="auto" unmountOnExit>
              {formattedTodos.map(d =>
                d.done ? (
                  <TodoItem
                    todo={d}
                    addTodo={todo => props.addTodo(todo)}
                    deleteTodo={tid => props.deleteTodo(tid)}
                    checkTodo={tid => props.checkTodo(tid)}
                    editTodo={(tid, todo) => props.editTodo(tid, todo)}
                    pathEl={props.pathEl}
                  />
                ) : (
                  ""
                )
              )}
            </Collapse>
            
          </div>
        </Collapse>
      </Paper>
    </React.Fragment>
  );
}

function formatTodos(props) {
  // filter out title: null
  var ret = props.todos.filter(e => e.title !== null);

  // first filter out links for path
  ret = ret.map(e => ({
    ...e,
    links: e.links.filter(
      el => el.path === props.path && el.label === props.label
    )
  }));

  // remove all todos that have no links with this path
  ret = ret.filter(e => e.links.length !== 0);

  // reformat
  return ret.map(e => ({
    ...e,
    label: e.links[0].label,
    sublabel: e.links[0].sublabel
  }));
}

function compareTodo(a, b) {
  if (a.done == b.done) {
    var ad = new Date(a.deadline);
    var bd = new Date(b.deadline);
    return ad - bd;
  } else {
    return a.done - b.done;
  }
}

const todoStyle = {
  form: {
    marginTop: "8px",
    marginBottom: "8px"
  },
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
    margin: "none"
  },
  toprow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0px"
  }
};
