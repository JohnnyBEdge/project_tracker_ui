import React, {useState} from 'react';
import AddProject from 'components/addProject/AddProject';
// import '../nav/nav.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import { makeStyles } from '@material-ui/core/styles';

const Nav = (props) => {
    // const [newProject, setNewProject] = useState("")
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                {/* <ArrowBackIosIcon
                    onClick={() => props.handlePrev()}/> */}
                <Typography variant="h6" className={classes.title}>
                    <ArrowBackIosIcon
                        onClick={() => props.handlePrev()}
                        className={classes.arrow}
                        />
                    Project: {props.currentProject}
                    <ArrowForwardIosIcon
                        onClick={() => props.handleNext()}
                        className={classes.arrow}/>
                </Typography>
                {/* <ArrowForwardIosIcon
                    onClick={() => props.handleNext()}/> */}
                <AddProject 
                    addProjectHandler={props.addProjectHandler}/>
                </Toolbar>
            </AppBar>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    arrow: {
        margin: "10px 20px 0px 20px"
    }
  }));

export default Nav;