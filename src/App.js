import React, {useState} from 'react';
import './App.css';
import Projects from './components/projects/Projects';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useHistory } from "react-router-dom";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  let history = useHistory();

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    setIsAuthenticated: setIsAuthenticated,
    setUser: setUser
  }

  return (
    <div className="App">
      <Router>
            <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} auth={authProps}/>} />
                <Route exact path="/register" render={(props) => <Register {...props} auth={authProps}/>} />
                <Route exact path="/" render={(props) => <Projects {...props} auth={authProps}/>} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
