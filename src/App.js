import React from 'react';
import './App.css';
import Projects from './components/projects/Projects'
import Login from './components/loginRegister/Login'
import Register from './components/loginRegister/Register'

import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Projects /> */}

      <Router>
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/projects">
                    <Projects/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
