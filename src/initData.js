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
      children: []
    },
    {
      label: "goals",
      labels: ["daily", "weekly", "monthly", "yearly"],
      children: []
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
        sublabel: "18.600"
      },
      {
        path: "all/school",
        label: "18.600",
        sublabel: ""
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
        sublabel: "6.890"
      },
      {
        path: "all/school",
        label: "6.890",
        sublabel: ""
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
        sublabel: "6.009"
      },
      {
        path: "all/school",
        label: "6.009",
        sublabel: ""
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
        sublabel: "daily"
      },
      {
        path: "all/goals",
        label: "daily",
        sublabel: ""
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
        sublabel: "daily"
      },
      {
        path: "all/goals",
        label: "daily",
        sublabel: ""
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
        sublabel: "weekly"
      },
      {
        path: "all/goals",
        label: "weekly",
        sublabel: ""
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
        sublabel: "small"
      },
      {
        path: "all/tasks",
        label: "small",
        sublabel: "email"
      },
      {
        path: "all/tasks/small",
        label: "email",
        sublabel: ""
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
        sublabel: "medium"
      },
      {
        path: "all/tasks",
        label: "medium",
        sublabel: "email"
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
        sublabel: "small"
      },
      {
        path: "all/tasks",
        label: "small",
        sublabel: "reimbursement"
      },
      {
        path: "all/tasks/small",
        label: "reimbursement",
        sublabel: ""
      }
    ]
  }
];
