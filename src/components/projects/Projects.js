import React, {useState, useEffect} from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import Goal from '../goal/Goal'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
const config = require('../../config.json');
const tempData = require('../../tempData.json');


const Projects = (props) => {
    // const [projects, setProjects] = useState([]);
    const [projects, setProjects] = useState(tempData);
    const [current, setCurrent] = useState(0);



    // const fetchProjects = async () => {
    //     const currentUser =  await Auth.currentUserInfo()
    //     try{
    //         const res = fetch(`${config.api.invokeUrl}/users/${11111}`);
    //         // const res = await axios.get(`${config.api.invokeUrl}/users/${11111}`);
    //         setProjs(res.data.projects);
    //         // const res = await axios.get(`${config.api.invokeUrl}/users/${currentUser.attributes.sub}`);
    //         // setProjs(res.data.projects);

    //     } catch(error){
    //         console.log("Error: ", error)
    //     };
    // };
//     function getProjects(){
//         fetch(`${config.api.invokeUrl}/users/${11111}`)
//            .then(res => res.json())
//            .then(data => {
//                console.log("data",data)
//                setProjects(data.projects)
//            })
//    };

//     const myprojs = projects
//    console.log("projects2",myprojs[0].goals)
    

    const deleteSubGoal = () => {

    }
    
    const projectManager = {
        currentProject: projects[current],
        // currentProject: projs[current],
        // projects: projs,
        projects: projects,
        setCurrent: setCurrent,
        // setProjects: setProjs
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
        // fetchProjects();
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
            {props.auth.isAuthenticated && props.auth.user ?
                <Button
                    onClick={handleLogout}>
                    LogOut {props.auth.user.username}
                </Button>

                : ""}
            <ProjectHeader
                // addProjectHandler={addProject} 
                // currentProject={projs[current]}
                currentProject={projects[current]}
                handleNext={handleNext}
                handlePrev={handlePrev}
                projectManager={projectManager}
                /> 
                {createGoal}

        </div>
    )
};

export default Projects;