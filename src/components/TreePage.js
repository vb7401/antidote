import React from "react";
import { Route } from "react-router-dom";
import display from "./Data.js";
import Header from "./Header";
import Todo from "./Todo";

import Grid from "@material-ui/core/Grid";

function generateStrings(data) {
  var ret = [];

  // recursively generate child pages
  var gen = data.children.map(d => generateStrings(d));
  gen.forEach(x => (ret = ret.concat(x)));

  // add new label to path
  ret = ret.map(d => ({
    path: `${data.label}/${d.path}`,
    pathEl: [{
      ind: data.label,
      prefix: data.label
    }].concat(d.pathEl.map(e => ({
      ind: e.ind,
      prefix: data.label + "/" + e.prefix
    }))),
    labels: d.labels
  }));

  // add base case
  ret.push({
    path: `${data.label}`,
    pathEl: [{
      ind: data.label,
      prefix: data.label,
    }],
    labels: data.labels
  });

  return ret;
}

export default function TreePage() {
  var toDisplay = generateStrings(display());
  console.log(toDisplay);
  return toDisplay.map(d => (
    <Route exact path={`/${d.path}`}>
      <Header path={d.path} pathEl={d.pathEl} />
      <Grid container>
        {d.labels.map(label => (
          <Grid item xs={4}>
            <Todo path={d.path} label={label} />
          </Grid>
        ))}
      </Grid>
    </Route>
  ));
}
