export default function display() {
  return {
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
}
