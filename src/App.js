import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import TreePage from "./components/TreePage"
import Login from './components/Login'

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Route exact path="/">
            <Login />
          </Route>
          <TreePage/>
        </div>
      </div>
    </Router>
  );
}