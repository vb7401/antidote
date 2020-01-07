import React from "react";
import { Route } from "react-router-dom";
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
    pathEl: [
      {
        ind: data.label,
        prefix: data.label
      }
    ].concat(
      d.pathEl.map(e => ({
        ind: e.ind,
        prefix: data.label + "/" + e.prefix
      }))
    ),
    labels: d.labels,
    todos: d.todos
  }));

  // add base case
  ret.push({
    path: `${data.label}`,
    pathEl: [
      {
        ind: data.label,
        prefix: data.label
      }
    ],
    labels: data.labels,
    todos: data.todos
  });

  return ret;
}

export default function TreePage() {
  var toDisplay = generateStrings(display);

  // route each possible page
  return toDisplay.map(d => (
    <Route exact path={`/${d.path}`}>
      <Header path={d.path} pathEl={d.pathEl} />

      <Grid container>
        {d.labels.map(label => (
          <Grid item xs={4}>
            <Todo 
              todos={d.todos.filter(t => t.label === label)} 
              path={d.path} 
              label={label} 
            />
          </Grid>
        ))}
      </Grid>
    </Route>
  ));
}

var display = {
  label: "all",
  labels: ["tasks", "school", "goals"],
  todos: [
    {
      title: "18.600 PSET 3",
      label: "school",
      sublabel: "18.600"
    },
    {
      title: "6.890 Final Project",
      label: "school",
      sublabel: "6.890"
    },
    {
      title: "6.009 Lab 5",
      label: "school",
      sublabel: "6.009"
    },
    {
      title: "Respond to Aayush",
      label: "tasks",
      sublabel: "small",
    }
  ],
  children: [
    {
      label: "tasks",
      labels: ["small", "medium", "large"],
      todos: [],
      children: [
        {
          label: "small",
          labels: ["email", "reimbursement"],
          todos: [],
          children: []
        }
      ]
    },
    {
      label: "school",
      labels: ["6.009", "18.600", "24.118", "6.890", "8.02", "6.036"],
      todos: [],
      children: [],
    },
    {
      label: "goals",
      labels: ["daily", "weekly", "monthly", "yearly"],
      todos: [],
      children: [],
    }
  ]
};
