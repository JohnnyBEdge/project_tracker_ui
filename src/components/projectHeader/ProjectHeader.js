import React from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import ProgressBar from '../progressBar/ProgressBar';
import AddGoalForm from '../goal/AddGoalForm';
import LogoutBtn from '../buttons/LogoutBtn';
import CreateProjBtn from '../buttons/CreateProjBtn';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';


export default function ProjectHeader(props) {
  const classes = useStyles();

//   const handleCount = () => {
//     return props.projectManager.currentProject.subGoals.filter(subgoal => subgoal.checked).length;
// };
  // return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;

const completedGoals = props.projectManager.currentProject.goals.filter(goal => goal.completed).length;
const totalGoals = props.projectManager.currentProject.goals.length;
const progress = {completedGoals}/{totalGoals};

  return (
    <div className={classes.root}>
      <div className={classes.btnContainer}>
        <CreateProjBtn 
          projectManager={props.projectManager}/>
        <LogoutBtn
          auth={props.auth}/>
      </div>
      <div>
        <ProjectTitle 
          projectManager={props.projectManager}
          handleNext={props.handleNext}
          handlePrev={props.handlePrev}/>
      </div>

      <div className={classes.progressBar}>
        <Tooltip title="Add New Goal" aria-label="add">
          <AddGoalForm 
              projectManager={props.projectManager}/>
          </Tooltip>
        <ProgressBar 
          projectManager={props.projectManager}
          progress={progress}
          />
      </div>
      <p className={classes.completed}>Goals Completed: {completedGoals}/{totalGoals}</p>

      <div className="about-accordion">
        <AboutAccordion 
          about={"Project Details"}
          details={props.projectManager.currentProject.projDesc}
          
          />
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  progressBar: {
    display: "flex"
  },
  completed: {
    fontSize: 13,
    marginTop: -10
  },
  btnContainer:{
    backgroundColor: "#545352",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    }
}));