import React from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import ProgressBar from '../progressBar/ProgressBar';
import AddGoalForm from '../goal/AddGoalForm';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Tooltip from '@material-ui/core/Tooltip';


export default function ProjectHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="new-proj-btn">
        <AddIcon />
      </div>
      <AddGoalForm/>
      <div className="title-container">
        <ProjectTitle 
          currentProject={props.currentProject}
          handleNext={props.handleNext}
          handlePrev={props.handlePrev}/>
      </div>

      <div className="progress-bar">
        <ProgressBar 
          currentProject={props.currentProject}/>
          {/* <Tooltip title="Add New Goal" aria-label="add">
            <AddCircleIcon color="primary" fontSize="small"/>
          </Tooltip> */}
          Total Goals: {props.currentProject.goals.length}
      </div>

      <div className="about-accordion">
        <AboutAccordion 
          // currentProject={props.currentProject}
          about={"About"}
          details={props.currentProject.projDesc}
          
          />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));