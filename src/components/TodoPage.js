import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Todo from "./components/Todo";

import Grid from "@material-ui/core/Grid";

// props: path, labels

export default class TodoPage extends Component {
  render() {
    return (
      <div className={todoPageStyle.root}>
        <Header label={this.props.label} />
        <Grid container>
            {this.props.labels.map(label => (
                <Grid item xs={4}>
                <Todo label={label} />
                </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

TodoPage.propTypes = {
  labels: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
};

const todoPageStyle = {
  root: {
    flexGrow: 1
  }
};
