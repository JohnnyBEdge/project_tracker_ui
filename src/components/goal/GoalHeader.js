import React, {useState} from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import AddSubgoalForm from '../goal/AddSubgoalForm';
import ProgressBar from '../progressBar/ProgressBar';
import Checkbox from '@material-ui/core/Checkbox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


export default function GoalHeader(props) {

  const [goalComplete, setGoalComplete] = useState(false)
  const projectDetails = props.goalDetails;

  async function deleteGoal(idx){
    if(window.confirm("Are you sure you want to delete this subgoal?")){
    //removes the goal from currentproject list
    await props.projectManager.projects[props.projectManager.current].goals.splice(idx,1);
    // await props.projectManager.currentProject.goals.splice(idx,1);
    //adding update project to variable
    const updated = props.projectManager.currentProject
    // //finding the index of the old project
    const index = props.projectManager.projects.findIndex(proj => proj.id === updated.id);
    // //replacing old with new
    props.projectManager.projects.splice(index, 1, updated);
    //makes network call to update DB
    await props.projectManager.updateProjects()
    }
  }



  const handleCount = () => {
    return projectDetails.subGoals.filter(subgoal => subgoal.completed).length;
};

// const countCompleted = () => {
//   return projectDetails)
// }
const completedGoals = props.projectManager.currentProject.goals.filter(goal => goal.goalCompleted).length;
const totalGoals = props.projectManager.currentProject.goals.length;

  const classes = useStyles();

  const percentProgress = handleCount()/props.goalDetails.subGoals.length *100;

  return (
    <div className={classes.goalHeaderContainer}>
        <Checkbox
            color="default"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={percentProgress === 100 ? true : false}
        /> 
        <p className={classes.goalTitle}>{props.goalDetails.goalName}</p>
        <AddSubgoalForm 
          projectManager={props.projectManager}
          index={props.index}
          />
          <CloseIcon
            onClick={() => deleteGoal(props.index)}
            color="secondary"
            size="small"/>
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
      flexWrap: "wrap",
      justifyContent: "space-between",
      margin: 10,
      backgroundColor: "#F2F2F2"
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 500,
  }
}));