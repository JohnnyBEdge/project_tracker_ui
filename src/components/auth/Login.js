import React, {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";



const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [msg, setMsg] = useState('');

    let history = useHistory();

    const toggle = () => {
        setRemember(!remember);
    };



    const handleLogin = async () => {
        //checks if email and password is valid
        setMsg('');
        if(remember){
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        };
        try{
            const user = await Auth.signIn(username, password);
            console.log("user from login: ", user);
            props.auth.setIsAuthenticated(true);
            props.auth.setUser(user);
            history.push('/projects');
        } catch(error){
            let err = null;
            !error.message ? err = {"message": error} : err = error
            setMsg("Invalid credentials")
        };

    };

    const classes = useStyles();

    useEffect(() => {
        const localUsername = localStorage.getItem('username');
        if(localUsername){
            setUsername(localUsername);
            setRemember(true);
        }
    }, []);
    
    return(

        <div id="login_container">
            <Container component="main" maxWidth="xs" className={classes.formContainer}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <span className={classes.msg}>{msg}</span>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox
                                    name="remember" 
                                    checked={remember} 
                                    color="primary"
                                    onChange={toggle} />}
                        label="Remember me"
                    />
                    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => handleLogin()}
                    >
                        Sign In
                    </Button>
                    <Grid container className={classes.linkContainer}>
                        <Grid item xs>
                        <Link to="" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link 
                            to="/register"
                            variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    </div>
    
    )
};

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formContainer: {
        // border: "solid black 1px",
        // borderRadius: 5,
        // height: "100%"
        
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    msg: {
        color: "red",
        fontSize: "20px"
    },
    linkContainer: {
        marginBottom: 50
    }
  }));

export default Login;