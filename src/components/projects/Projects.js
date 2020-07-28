import React, {useState} from 'react';
import '../projects/projects.css'
import ProjectHeader from 'components/projectHeader/ProjectHeader';



const Projects = () => {
    const [projects, setProjects] = useState(["one", "two", "three"]);
    const [current, setCurrent] = useState(0);

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