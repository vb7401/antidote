import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default class Header extends React.Component {
  render() {
    return (
      <div className={headerStyle.root}>
        <AppBar style={headerStyle.bar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" style={headerStyle.title}>
              <b>antidote</b> <u>#{this.props.label}</u>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const headerStyle = {
  root: {
    flexGrow: 1
  },
  bar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  title: {
    flexGrow: 1
  }
};
