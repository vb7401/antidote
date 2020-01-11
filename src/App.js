import React from "react";
import {Router, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import TreePage from "./components/TreePage"
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import firebase from './Firebase'

import "./App.css";

const history = createBrowserHistory();

export default class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    var self = this
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.setState({user: user.uid})
        if (history.location.pathname === "/") {
          history.push("/all")
        }
      } else {
        history.push("/login");
      }
    })
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="container">
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/recommendations">
              <Recommendation />
            </Route>
            {
              (this.state.user != null) ? 
                <TreePage user={this.state.user}/> : ""
            }
          </div>
        </div>
      </Router>
    );
  }
}

