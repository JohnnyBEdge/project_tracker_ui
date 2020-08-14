import React, {useState, useEffect} from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import Goal from '../goal/Goal'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const config = require('../../config.json');
const tempData = require('../../tempData.json');





const Projects = (props) => {
    // const [projects, setProjects] = useState([]);
    const [projects, setProjects] = useState(tempData);
    const [current, setCurrent] = useState(0);

//     function getProjects(){
//         setLoading(true)
//         fetch(`${config.api.invokeUrl}/users/${11111}`)
//            .then(res => res.json())
//            .then(data => {
//                console.log("PROJECTS", data.projects)
//                setProjects(data.projects)
//            })
//            setLoading(false)
//    };    

console.log("PROJECTS",projects[current].goals)

    const deleteSubGoal = () => {

    }
    
    const projectManager = {
        currentProject: projects[current],
        projects: projects,
        setCurrent: setCurrent,
        setProjects: setProjects
    }

    let history = useHistory();

    const handleLogout = async () => {
        try{
            Auth.signOut();
            Auth.setIsAuthenticated(false);
            Auth.setUser(null);
            history.push('/login')
        } catch(error){
            console.log(error.message)
        }
    };

    const addProject = (newProject) => {
        setProjects(projects => [...projects, newProject]);
    };

    const handleNext = () => {
        // if(current === projs.length-1){
        if(current === projects.length-1){
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        };
    };
    const handlePrev = () => {
        if(current === 0){
            // setCurrent(projs.length - 1)
            setCurrent(projects.length - 1)
        } else {
            setCurrent(current - 1)
        };
    };

    useEffect(() => {
        // getProjects();
      }, []);

      let index = 0;

    const createGoal = projects[current].goals.map(goal => {
        return <Goal 
            goalDetails={goal} 
            projectManager={projectManager}
            index={index++}
            />
    })


    return(
        <div className={"projects-container"}>
                {/* <Button
                    onClick={handleLogout}>
                    LogOut {props.auth.user.username}
                </Button> */}

            <ProjectHeader
                // addProjectHandler={addProject} 
                handleNext={handleNext}
                handlePrev={handlePrev}
                projectManager={projectManager}
                />
                {createGoal} 
        </div>
    )
};
  

export default Projects;