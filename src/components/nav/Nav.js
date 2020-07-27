import React, {useState} from 'react';
import AddProject from 'components/addProject/AddProject';
import 'components/nav/nav.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Nav = (props) => {
    const [newProject, setNewProject] = useState("")
    return(
        <div className={"nav-container"}>
            <AppBar position="static" >
                <Toolbar>
                <IconButton 
                    edge="start" 
                    className={"menuButton"} 
                    color="inherit" 
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <AddProject/>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Nav;