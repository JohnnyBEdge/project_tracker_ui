import React, {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify'
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import Goal from '../goal/Goal'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
const config = require('../../config.json');
const tempData = require('../../tempData.json');


const Projects = (props) => {
    const [projects, setProjects] = useState(tempData);
    // const [projects, setProjects] = useState(tempUserData);
    const [current, setCurrent] = useState(0);

    const fetchProjects = async () => {
        try{
            const res = await axios.get(`${config.api.invokeUrl}/projects`);
            setProjects(res.data);
            // console.log("Projects: ",res.data)
        } catch(error){
            console.log("Error: ", error)
        };
    }
    console.log("current project ",projects[0].projects[current])
    

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

    useEffect(() => {
        // fetchProjects();
      }, []);

    const createGoal = projects[0].projects[current].goals.map(goal => {
        return <Goal goalDetails={goal}/>
    })

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
                // currentProject={projects[current]}
                handleNext={handleNext}
                handlePrev={handlePrev}
                // currentProject={projects[current]}/>
                currentProject={projects[0].projects[current]}/>

                {createGoal}
                {/* <Goal
                    currentProject={projects[0].projects[current]}
                    /> */}
        </div>
    )
};

export default Projects;