import React from 'react';
import './App.css';
import Projects from './components/projects/Projects';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useHistory } from "react-router-dom";


import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  let history = useHistory();

  return (
    <div className="App">
      {/* <Projects /> */}

      <Router>
            <Switch>
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/register" render={() => <Register />} />
                <Route exact path="/" render={() => <Projects />} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
