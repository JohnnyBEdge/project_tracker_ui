import React, {useState, useEffect} from 'react';
import Amplify, { Auth, Storage, loadingBar } from 'aws-amplify';
import '../projects/projects.css'
import ProjectHeader from '../projectHeader/ProjectHeader';
import SaveChangesBtn from '../buttons/SaveChangesBtn';

import Goal from '../goal/Goal'
import axios from 'axios';

const config = require('../../config.json');
// const tempData = require('../../tempData.json');


const Projects = (props) => {
    const [projects, setProjects] = useState([{}]);
    const [current, setCurrent] = useState(0);
    const [saveBtn, setSaveBtn] = useState(false);
    const [clientID, setClientID] = useState(null)

    // const session = await Auth.currentUserInfo();
    // const clientID = await session.attributes.sub;
    // const session = Auth.currentUserInfo();
    // const clientID = session.attributes.sub;

    async function getProjects(){
        // const session = await Auth.currentUserInfo();
        // const clientID = await session.attributes.sub;
        let response = await fetch(`${config.api.invokeUrl}/users/${clientID}`);
        // let response = await fetch(`${config.api.invokeUrl}/users/${11111}`);
        let data = await response.json();
        setProjects(data.projects)
   };

//    const id = 11111;

   async function updateProjects(){
    // const session = await Auth.currentUserInfo();
    // const clientID = await session.attributes.sub;
    try {
      const params = {
        "id": JSON.stringify(clientID),
        "projects": projects
      };
     await axios.put(`${config.api.invokeUrl}/users/${clientID}`, params);
     await setSaveBtn(false)
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
    };
    async function getUser(){
        const session = await Auth.currentUserInfo();
        await setClientID(session.attributes.sub);
        await console.log("CLIENT: ", session.attributes.sub)
    }
    
    
    

    useEffect(() => {
        getProjects();
        getUser();
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
    : <p>Loading...</p>

    const header = goals ? 
        <ProjectHeader
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