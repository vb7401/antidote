import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

import EditTodo from "./EditTodo";

export default class TodoItem extends React.Component {
  state = {
    open: false
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <div style={todoItemStyle.line}>
          <div>
            <Checkbox
              style={todoItemStyle.checkbox}
              checked={this.props.todo.done}
              onChange={this.props.checkTodo.bind(this, this.props.todo.key)}
            />
            <Link onClick={this.handleClickOpen} style={todoItemStyle.link}>
                {this.props.todo.done ? 
                    <del>{this.props.todo.title}</del> : this.props.todo.title
                }
            </Link>
            {this.props.todo.sublabel !== "" ? (
              <Button
                disabled={true}
                variant="contained"
                style={todoItemStyle.sublabel}>
                {"#" + this.props.todo.sublabel}
              </Button>
            ) : (
              ""
            )}
          </div>

          <div>
            <IconButton onClick={this.props.deleteTodo.bind(this, this.props.todo.key)}>
              <RemoveIcon style={todoItemStyle.sub} fontSize="small" />
            </IconButton>
          </div>
        </div>

        <EditTodo
          todo={this.props.todo}
          label={this.props.label}
          handleClose={this.handleClose}
          editTodo={(tid, todo) => this.props.editTodo(tid, todo)}
          open={this.state.open}
          pathEl={this.props.pathEl}
        />
      </React.Fragment>
    );
  }
}

const todoItemStyle = {
    checkbox: {
        margin: "none"
    },
    line: {
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    sub: {
      margin: "none"
    },
    sublabel: {
      fontSize: "small",
      marginLeft: "10px",
      // background: 'linear-gradient(45deg, #6C5B7B 10%, #C06C84 90%)',
      background: "#6C5B7B",
      color: "white",
      padding: "3px",
      textTransform: "lowercase"
    },
    link: {
      textDecoration: "none",
      color: "black",
    }
  };
