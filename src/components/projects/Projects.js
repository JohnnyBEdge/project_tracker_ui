import React, {useState, useEffect} from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import SaveChangesBtn from '../buttons/SaveChangesBtn';

import Goal from '../goal/Goal'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const config = require('../../config.json');
const tempData = require('../../tempData.json');


const Projects = (props) => {
    const [projects, setProjects] = useState([{}]);
    const [current, setCurrent] = useState(0);
    const [saveBtn, setSaveBtn] = useState(false);


    async function getProjects(){
        let response = await fetch(`${config.api.invokeUrl}/users/${11111}`);
        let data = await response.json();
        setProjects(data.projects)
   };

   const id = 11111;

   async function updateProjects(){
    try {
      const params = {
        "id": JSON.stringify(id),
        "projects": projects
      };
     await axios.put(`${config.api.invokeUrl}/users/${11111}`, params);
     await setSaveBtn(false)
     console.log("SAVED")
    //  await getProjects();
    }catch (err) {
        console.log(`Error updating product: ${err}`);
    }
  }

    const projectManager = {
        currentProject: projects[current],
        projects: projects,
        current: current,
        setCurrent: setCurrent,
        setProjects: setProjects,
        updateProjects: updateProjects,
        saveChanges: setSaveBtn
    }

    const addProject = (newProject) => {
        setProjects(projects => [...projects, newProject]);
    };

    const handleNext = () => {
        console.log("projects length", projects.length)
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
        console.log("current: ",current)
    };

    useEffect(() => {
        getProjects();
      }, []);

      let index = 0;
    
    const goals = projects[current].goals;
    const createGoal = goals ? goals.map(goal => {
        return <Goal 
            goalDetails={goal} 
            projectManager={projectManager}
            key={index}
            index={index++}
            />
    })
    : <CircularProgress />

    const header = goals ? 
        <ProjectHeader
        // addProjectHandler={addProject} 
        handleNext={handleNext}
        handlePrev={handlePrev}
        projectManager={projectManager}
        goals={goals}
        auth={props.auth}
        /> 
    : ''

    const saveButton = saveBtn ? 
        <SaveChangesBtn
            update={updateProjects} />
        : ''

    return(
        <div className={"projects-container"}>
                {header}
                {createGoal} 
                {saveButton}
        </div>
    )
};
  

export default Projects;