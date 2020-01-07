import React, { useState } from "react";
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import Paper from "@material-ui/core/Paper";

export default function Todo(props) {
  const [todos, setTodos] = useState([]);
  const [labels, setLabels] = useState([]);

  const match = useRouteMatch();
  console.log(match.path);
  return (
    <React.Fragment>
      <Paper style={noteStyle}>
        <Link to={`${match.path}/${props.label}`}>{props.label}</Link>
      </Paper>
    </React.Fragment>
  );
}

const noteStyle = {
  padding: "16px",
  margin: "16px",
  textAlign: "center"
};
