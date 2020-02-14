import React from 'react';
import {Switch, Route} from "react-router-dom";
import Projects from "./components/Projects";
import Project from "./components/Project";
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/:id" component={Project} /> */}
        <Route path="/" component={Projects} />
        <Route component={Projects} />
      </Switch>
    </div>
  );
}

export default App;
