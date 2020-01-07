import React from "react";

import Checkbox from '@material-ui/core/Checkbox';

export default function TodoList(props) {
  return (
    <div style={todoListStyle.form}>
        {props.todos.map(d => (
          <div style={{textAlign: "left"}}>
              <Checkbox /> {d.title}
              <div style={todoListStyle.sublabel}>{"#" + d.sublabel}</div>
          </div>
        ))}
    </div>
  );
}

const todoListStyle = {
    form: {
        margin: '8px',
    },
    sublabel: {
        padding: '3px',
        backgroundColor: 'blue'
    }
}
