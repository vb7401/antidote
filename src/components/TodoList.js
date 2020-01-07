import React from "react";

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function TodoList(props) {
  return (
    <div style={todoListStyle.form}>
        {props.todos.map(d => (
          <div style={{textAlign: "left"}}>
              <Checkbox /> {d.title}
              {
                (d.sublabel !== "") ?
                <Button variant="contained" style={todoListStyle.sublabel}>
                    {"#" + d.sublabel}
                </Button> : ""
              }
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
        fontSize: 'small',
        marginLeft: '10px',
        backgroundColor: '#383838',
        color: 'white',
        padding: '3px',
        textTransform: 'lowercase',
    }
}