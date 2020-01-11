import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header(props) {
  return (
    <div className={headerStyle.root}>
      <AppBar style={headerStyle.bar} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          {(props.todo) ? (
              <Typography variant="h5" style={headerStyle.title}>
                <b>todos #</b>
                {props.pathEl.map(el => (
                  <React.Fragment>
                    {el.ind === "all" ? "" : "/"}
                    <Link to={"/" + el.prefix} style={headerStyle.link}>
                      {el.ind}
                    </Link>
                  </React.Fragment>
                ))}
              </Typography>
            ) : (
              <Typography variant="h5" style={headerStyle.title}>
                <b>{props.path}</b>
              </Typography>
            )
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
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
  },
  link: {
    textDecoration: "underline",
    color: "white"
  }
};