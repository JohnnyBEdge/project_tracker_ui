import React from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import AddSubgoalForm from '../goal/AddSubgoalForm';
import ProgressBar from '../progressBar/ProgressBar';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


export default function GoalHeader(props) {
  const projectDetails = props.goalDetails;

  const handleCount = () => {
    return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;
};

  const classes = useStyles();

  return (
    <div className={classes.goalHeaderContainer}>
        <Checkbox
            color="default"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        /> 
        <p>{props.goalDetails.goalName}</p>
        <AddSubgoalForm 
          projectManager={props.projectManager}
          index={props.index}
          />
        <ProgressBar 
        //total subgoals completed over total subgoals. *100 to get percent
          progress={handleCount()/props.goalDetails.subGoals.length *100}/>
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