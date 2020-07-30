import React, {useState} from 'react';

import { createBrowserHistory } from 'history';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Auth } from 'aws-amplify';

const history = createBrowserHistory();

const RegisterForm = (props) => {

    // const [fname, setFname] = useState('');
    // const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [validForm, setValidForm] = useState(false);
    const {errorMsg, setErrorMsg} = useState("Error")
    const [errors, setErrors] = useState({
        cognito: null,
        blankfield: false,
        passwordmatch: false
      })


    // const [fNameError, setFNameError] = useState(false);
    // const [lNameError, setLNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
	
    //   Password must contain at least one letter, at least one number, and be longer than six charaters.
    const passwordRegex = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    const handleFormValidation = (e) => {
        const {name, value} = e;
        switch(name){
            case "username":
                username === '' ? setUsernameError(true) : setUsernameError(false);
                break;
            case "email":
                email.match(emailRegex) ? setEmailError(false) : setEmailError(true);
                break;
            case "password":
                value.match(passwordRegex) ? setPasswordError(false) : setPasswordError(true);
                break;    
            case "passwordMatch":
                value.match(password) ? setPasswordMatchError(false) : setPasswordMatchError(true);
                break;
            default:
        };
    };

    const handleFormErrors = () => {
        if(
            usernameError === false && username !== '' 
            && emailError === false && email !== ''
            && passwordError === false && password !== ''
            && passwordMatchError === false && passwordMatch !== ''){
                setValidForm(true);
            } else {
                alert("Invalid form, check your information.")
            };
    }
    
    const registerAccount = async() => {
        handleFormErrors()
        if(validForm){
        try{
            
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes:{
                    email: email
                }
            })
            console.log(signUpResponse);
            history.pushState("/projects");
            setValidForm(false)
        } catch(error){
            let err = null;
            !error.message ? err = {"message": error} : err = error
            // alert(err||error)
            setErrors({
                errors: {
                    ...errors,
                    cognito: err
                }
            })
        }
    };
}
    

    // const addAccount = () => {

        // if(
        //     usernameError === false && username !== '' 
        //     && emailError === false && email !== ''
        //     && passwordError === false && password !== ''
        //     && passwordMatchError === false){
        //         console.log("valid form")
        //     } else {
        //         alert("Invalid form, check your information.")
        //     };


        // fetch('https://jm-shop-api.herokuapp.com/api/accounts/register', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type" : "application/json"
        //     },
        //     body: JSON.stringify({userName, email, password, isAdmin})
        // })
        // .then(() => {setFname(''); setLname(''); setEmail(''); setPassword(''); setPasswordMatch('')}
        // ).then(props.handleFormView)

    // };


    const classes = useStyles();
    
    return(
        <div id="register_container" className={classes.registerForm}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                    {errorMsg}
                    <form id="sign_up_form" className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            // autoComplete="fname"
                            name="username"
                            error={usernameError}
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            autoFocus
                            value={username}
                            onChange={({target}) => setUsername(target.value)}
                            onBlur={({target}) => handleFormValidation(target)}
                        />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}> */}
                        {/* <Grid item xs={12} sm={6}>
                        <TextField
                            // autoComplete="fname"
                            name="firstName"
                            error={fNameError}
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={fname}
                            onChange={({target}) => setFname(target.value)}
                            onBlur={({target}) => handleFormValidation(target)}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}> */}
                        {/* <TextField
                            variant="outlined"
                            error={lNameError}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            // autoComplete="lname"
                            value={lname}
                            onChange={({target}) => setLname(target.value)}
                            onBlur={({target}) => handleFormValidation(target)}
                        />
                        </Grid> */}
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            error={emailError}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={({target}) => setEmail(target.value)}
                            onBlur={({target}) => handleFormValidation(target)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            error={passwordError}
                            type="password"
                            required
                            fullWidth
                            id="password"
                            label="Create Password"
                            name="password"
                            value={password}
                            onChange={({target}) => {setPassword(target.value); 
                                handleFormValidation(target)
                            }}
                            helperText="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."

                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            type="password"
                            error={passwordMatchError}
                            variant="outlined"
                            required={true}
                            fullWidth
                            id="passwordMatch"
                            label="Confirm Password"
                            name="passwordMatch"
                            onChange={({target}) => {setPasswordMatch(target.value); 
                                handleFormValidation(target)
                            }}
                            helperText="Passwords must match."
                            value={passwordMatch}
                        />
                        </Grid>

                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => registerAccount()}
                        // onClick={() => addAccount()}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end" className={classes.linkContainer}>
                        <Grid item>
                        <Link to='/login' 
                        // onClick={props.handleFormView} 
                        variant="body2">
                            Already have an account? Sign in
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
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      registerForm: {
        //   border: "solid black 1px",
        //   borderRadius: 5,
        //   marginTop: 50
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      linkContainer: {
          marginBottom: 50
      }
  }));

export default RegisterForm;