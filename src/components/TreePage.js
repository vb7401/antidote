import React, {useState} from "react";
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
  });

  return ret;
}

export default function TreePage() {
  const [display, setDisplay] = useState(initDisplay);
  const [todos, setTodos] = useState(initTodos);

  var toDisplay = generateStrings(display);

  // route each possible page
  return toDisplay.map(d => (
    <Route exact path={`/${d.path}`}>
      <Header path={d.path} pathEl={d.pathEl} />

      <Grid container>
        {d.labels.map(label => (
          <Grid item xs={4}>
            <Todo 
              todos={todos} 
              path={d.path} 
              label={label} 
            />
          </Grid>
        ))}
      </Grid>
    </Route>
  ));
}

var initDisplay = {
  label: "all",
  labels: ["tasks", "school", "goals"],
  children: [
    {
      label: "tasks",
      labels: ["small", "medium", "large"],
      children: [
        {
          label: "small",
          labels: ["email", "reimbursement"],
          children: []
        }
      ]
    },
    {
      label: "school",
      labels: ["6.009", "18.600", "24.118", "6.890", "8.02", "6.036"],
      children: [],
    },
    {
      label: "goals",
      labels: ["daily", "weekly", "monthly", "yearly"],
      children: [],
    }
  ]
};

var initTodos = [
  {
    title: "18.600 PSET 3",
    done: false,
    links: [
      {
        path: "all",
        label: "school",
        sublabel: "18.600",
      },
      {
        path: "all/school",
        label: "18.600",
        sublabel: "",
      }
    ]
  },
  {
    title: "6.890 Final Project",
    done: false,
    links: [
      {
        path: "all",
        label: "school",
        sublabel: "6.890",
      },
      {
        path: "all/school",
        label: "6.890",
        sublabel: "",
      }
    ]
  },
  {
    title: "6.009 Lab 5",
    done: false,
    links: [
      {
        path: "all",
        label: "school",
        sublabel: "6.009",
      },
      {
        path: "all/school",
        label: "6.009",
        sublabel: "",
      }
    ]
  },
  {
    title: "Journal",
    done: false,
    links: [
      {
        path: "all",
        label: "goals",
        sublabel: "daily",
      },
      {
        path: "all/goals",
        label: "daily",
        sublabel: "",
      }
    ]
  },
  {
    title: "Make Music",
    done: false,
    links: [
      {
        path: "all",
        label: "goals",
        sublabel: "daily",
      },
      {
        path: "all/goals",
        label: "daily",
        sublabel: "",
      }
    ]
  },
  {
    title: "Lift for Six Days",
    done: false,
    links: [
      {
        path: "all",
        label: "goals",
        sublabel: "weekly",
      },
      {
        path: "all/goals",
        label: "weekly",
        sublabel: "",
      }
    ]
  },
  {
    title: "Respond to Aayush",
    done: false,
    links: [
      {
        path: "all",
        label: "tasks",
        sublabel: "small",
      },
      {
        path: "all/tasks",
        label: "small",
        sublabel: "email",
      },
      {
        path: "all/tasks/small",
        label: "email",
        sublabel: "",
      }
    ]
  },
  {
    title: "Thank Quora Recruiter",
    done: false,
    links: [
      {
        path: "all",
        label: "tasks",
        sublabel: "medium",
      },
      {
        path: "all/tasks",
        label: "medium",
        sublabel: "email",
      }
    ]
  },
  {
    title: "Contact Datathon",
    done: false,
    links: [
      {
        path: "all",
        label: "tasks",
        sublabel: "small",
      },
      {
        path: "all/tasks",
        label: "small",
        sublabel: "reimbursement",
      },
      {
        path: "all/tasks/small",
        label: "reimbursement",
        sublabel: "",
      }
    ]
  }
]