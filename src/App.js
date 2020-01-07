import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import TreePage from "./components/TreePage"

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <TreePage/>
        </div>
      </div>
    </Router>
  );
}