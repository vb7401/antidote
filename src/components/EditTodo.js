import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { withTheme } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class EditTodo extends React.Component {
  state = {
    title: this.props.todo.title,
    label: this.props.todo.label,
    priority: this.props.todo.priority,
    sublabel: this.props.todo.sublabel,
    deadline: this.props.todo.deadline,
  };

  handleTitle = e => this.setState({ title: e.target.value });
  handleLabel = e => this.setState({ label: e.target.value });
  handlePriority = e => this.setState({ priority: e.target.value });
  handleSublabel = e => this.setState({ sublabel: e.target.value });
  handleDeadline = e => this.setState({ deadline: e.target.value });

  handleSubmit = () => {
    this.props.editTodo(this.props.todo.key, {
      title: this.state.title,
      label: this.state.label,
      priority: this.state.priority,
      sublabel: this.state.sublabel,
      deadline: this.state.deadline,
      pathEl: this.props.pathEl
    });
    this.props.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          style={editTodoStyle.dialog}
        >
          <DialogTitle style={editTodoStyle.title}>
              edit a todo
          </DialogTitle>

          <DialogContent>
            <TextField
              value={this.state.title}
              onChange={this.handleTitle}
              required
              autoFocus
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="title"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={this.state.label}
              onChange={this.handleLabel}
              required
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="label"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={this.state.sublabel}
              onChange={this.handleSublabel}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="sublabel"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={this.state.priority}
              onChange={this.handlePriority}
              required
              autoFocus
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="priority"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={this.state.deadline}
              onChange={this.handleDeadline}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="deadline"
              variant="outlined"
              type="date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const editTodoStyle = {
  title: {
    textAlign: "center",
    margin: "0px"
  },
};
