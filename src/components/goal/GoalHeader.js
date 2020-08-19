import React, {useState} from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import AddSubgoalForm from '../goal/AddSubgoalForm';
import ProgressBar from '../progressBar/ProgressBar';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


export default function GoalHeader(props) {

  const [goalComplete, setGoalComplete] = useState(false)
  const projectDetails = props.goalDetails;


  const handleCount = () => {
    return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;
};

// const countCompleted = () => {
//   return projectDetails)
// }
const completedGoals = props.projectManager.currentProject.goals.filter(goal => goal.goalCompleted).length;
const totalGoals = props.projectManager.currentProject.goals.length;

  const classes = useStyles();

  const percentProgress = handleCount()/props.goalDetails.subGoals.length *100;

  console.log("GOALS",props.goalDetails)

  return (
    <div className={classes.goalHeaderContainer}>
        <Checkbox
            color="default"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={percentProgress === 100 ? true : false}
        /> 
        <p>{props.goalDetails.goalName}</p>
        <AddSubgoalForm 
          projectManager={props.projectManager}
          index={props.index}
          />
          <p>Goal status: {props.goalDetails.goalCompleted ? "completed" : "incomplete"}</p>
        <ProgressBar 
        //total subgoals completed over total subgoals. *100 to get percent
          progress={percentProgress}/>
          {/* subgoals completed over total */}
        <p>{handleCount()}/ {props.goalDetails.subGoals.length}</p>
        
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  goalHeaderContainer: {
      display: "flex",
      flexWrap: "wrap"
  }
}));