import React, {useState} from 'react';
import {Auth} from 'aws-amplify'
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


// import axios from 'axios';



const Projects = (props) => {
    const [projects, setProjects] = useState(["one", "two", "three"]);
    const [current, setCurrent] = useState(0);

    let history = useHistory();


    // const getUsers = async() => {
    //     // const res = await axios.get(process.env.DB_URL)
    // };
    const handleLogout = async () => {
        try{
            Auth.signOut();
            props.auth.setIsAuthenticated(false);
            props.auth.setUser(null);
            history.push('/login')
        } catch(error){
            console.log(error.message)
        }
    };

    const addProject = (newProject) => {
        setProjects(projects => [...projects, newProject]);
    };

    const handleNext = () => {
        if(current === projects.length-1){
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        };
    };
    const handlePrev = () => {
        if(current === 0){
            setCurrent(projects.length - 1)
        } else {
            setCurrent(current - 1)
        };
    };


    return(
        <div className={"projects-container"}>
            {props.auth.isAuthenticated && props.auth.user ?
                <Button
                    onClick={handleLogout}>
                    LogOut {props.auth.user.username}
                </Button>

                : ""}
            <ProjectHeader
                addProjectHandler={addProject} 
                currentProject={projects[current]}
                handleNext={handleNext}
                handlePrev={handlePrev}
                currentProject={projects[current]}/>
        </div>
    )
};

export default Projects;