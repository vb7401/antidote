export default function display() {
  return {
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
}
