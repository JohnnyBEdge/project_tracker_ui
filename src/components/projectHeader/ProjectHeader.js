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

//   const handleCount = () => {
//     return props.projectManager.currentProject.subGoals.filter(subgoal => subgoal.checked).length;
// };
  // return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;

const completedGoals = props.projectManager.currentProject.goals.filter(goal => goal.goalCompleted).length;
const totalGoals = props.projectManager.currentProject.goals.length;

  return (
    <div className={classes.root}>
      <div className="new-proj-btn">
        <AddIcon />
      </div>
      <div className="title-container">
        <ProjectTitle 
          projectManager={props.projectManager}
          handleNext={props.handleNext}
          handlePrev={props.handlePrev}/>
      </div>

      <div className="progress-bar">
        <ProgressBar 
          projectManager={props.projectManager}
          />
          {/* <Tooltip title="Add New Goal" aria-label="add">
            <AddCircleIcon color="primary" fontSize="small"/>
          </Tooltip> */}
          <AddGoalForm 
            // currentProject={props.currentProject}
            projectManager={props.projectManager}/>
          Total Goals: {completedGoals}/{totalGoals}
      </div>

      <div className="about-accordion">
        <AboutAccordion 
          // currentProject={props.currentProject}
          about={"About"}
          details={props.projectManager.currentProject.projDesc}
          
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