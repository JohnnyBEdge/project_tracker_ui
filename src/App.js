import React, {useState, useEffect} from 'react';
import './App.css';
import Projects from './components/projects/Projects';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import { useHistory } from "react-router-dom";
import {Auth} from 'aws-amplify';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true); 

  // let history = useHistory();

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    setIsAuthenticated: setIsAuthenticated,
    setUser: setUser
  }

  const loadUserState = async () => {
    try{
      //retrieves session object from local storage and refreshes token if necessary
      const session = await Auth.currentSession();
      setIsAuthenticated(true);
      console.log("session ",session);
      //gets user object
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch(error){
      console.log(error);
    }
    setIsAuthenticating(false);
  }

  useEffect(() => {
    loadUserState();
  }, []);


  return (
    !isAuthenticating &&
    <div className="App">
      <Router>
            <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} auth={authProps}/>} />
                <Route exact path="/register" render={(props) => <Register {...props} auth={authProps}/>} />
                <Route exact path="/projects" render={(props) => <Projects {...props} auth={authProps}/>} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
