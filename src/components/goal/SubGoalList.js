import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";


export default function SubGoalList(props) {
  const classes = useStyles();
  const [completed, setChecked] = useState(true);
  // const [checked, setChecked] = useState(true);

  const projectDetails = props.goalDetails;

  const handleCount = () => {
      return projectDetails.subGoals.filter(subgoal => subgoal.completed).length;
  };

  async function updateSubgoal(checkboxIndex){
    //gets the opposite of the current checked status, false if true, true if false
    const updatedCheckedStatus = !props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].completed;
    //updates the current checked status with the new one
    props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].completed = updatedCheckedStatus
    //adding update project to variable
    let updated = props.projectManager.currentProject;
    
    
    //creates array of newly updated subgoal completed statuses
    const isCompleted = updated.goals[props.index].subGoals.map(goal => goal.completed);
    //tests if all subgoals are completed, updates goal completed status if true
    const isTrue = (currVal) => currVal === true;
    if(isCompleted.every(isTrue)){
      props.projectManager.currentProject.goals[props.index].completed = true;
      //if true, update variable again with new goal completion status
      updated = props.projectManager.currentProject
    }

    //finding the index of the old project
    const index = props.projectManager.projects.findIndex(proj => proj.projName === updated.projName);
    //replacing old with new
    await props.projectManager.projects.splice(index, 1, updated);
    await props.projectManager.setProjects([...props.projectManager.projects]);
    //displays save changes button
    await props.projectManager.saveChanges(true);
  };
  
  
  
  async function deleteSubgoal(idx){
    console.log("CURR", props.projectManager.currentProject)
    if(window.confirm("Are you sure you want to delete this subgoal?")){
      //removes the subgoal
    await props.projectManager.currentProject.goals[props.index].subGoals.splice(idx,1);
    //adding update project to variable
    const updated = props.projectManager.currentProject
    //finding the index of the old project
    const index = props.projectManager.projects.findIndex(proj => proj.projName === updated.projName);
    //replacing old with new
    await props.projectManager.projects.splice(index, 1, updated);
    await props.projectManager.setProjects([...props.projectManager.projects])
    //displays save changes button
    await props.projectManager.saveChanges(true)
    //makes network call to update DB
    // await props.projectManager.updateProjects()
    }
    
  }

  useEffect(() => {
    handleCount()
  }, []);

  // console.log("subgoal length", props.goalDetails.subGoals.length)
  // console.log("completed subgoal length", props.goalDetails.subGoals.filter(sub => sub.completed).length)


  return (
    
    <List className={classes.root}>
      <p className={classes.subTitle}>Subgoals:</p>
      {props.goalDetails.subGoals.map((subgoal, index) => {
        const labelId = `checkbox-list-label-${subgoal}`;     
        return (
          
          <ListItem
            key={index} 
            role={undefined} 
            dense 
            button={true}
            >
              
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={subgoal.completed}
                color="default"
                // index={++index}
                 value={index}
                onChange={(e)=>updateSubgoal(e.target.value)}
                // disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId} 
              primary={subgoal.subGoal} />
              <CloseIcon 
                onClick={() => deleteSubgoal(index)}
                style={{ color: '#e02f14' }}
                fontSize="small"
                />
          </ListItem>
        );
        
      })}
      
    </List>

  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 335,
    backgroundColor: theme.palette.background.paper,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 0
  }
}));