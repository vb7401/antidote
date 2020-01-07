import React from "react";
import { Route } from "react-router-dom";
import display from "./Data.js"
import Header from "./Header";
import Todo from "./Todo";

import Grid from "@material-ui/core/Grid";

// returns a list of [path, labels]
function generateStrings(data) {
  var ret = [];
  var gen = data.children.map(d => generateStrings(d));
  gen.forEach(x => (ret = ret.concat(x)));
  ret = ret.map(d => [data.label + "/" + d[0], d[1]]);
  return ret.concat([[data.label, data.labels]]);
}

export default function TreePage() {
  var toDisplay = generateStrings(display());
  console.log(toDisplay);
  return toDisplay.map(d => (
    <Route exact path={`/${d[0]}`}>
      <Header label={d[0]} />
        <Grid container>
            {d[1].map(label => (
                <Grid item xs={4}>
                <Todo label={label} />
                </Grid>
            ))}
        </Grid>
    </Route>
  ));
}
