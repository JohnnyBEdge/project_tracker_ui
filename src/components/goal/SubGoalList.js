import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SubGoalList(props) {
  const classes = useStyles();
  const [completed, setChecked] = useState(true);
  // const [checked, setChecked] = useState(true);

  const projectDetails = props.goalDetails;

  const handleCount = () => {
      return projectDetails.subGoals.filter(subgoal => subgoal.completed).length;

  };

  const handleChange = (checkboxIndex) => {
    //gets the opposite of the current checked status, false if true, true if false
    const updatedCheckedStatus = !props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].completed;
    // const updatedCheckedStatus = !props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].checked;
    //updates the current checked status with the new one
    props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].completed = updatedCheckedStatus
    // props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].checked = updatedCheckedStatus
    //adding update project to variable
    const updated = props.projectManager.currentProject
    //finding the index of the old project
    const index = props.projectManager.projects.findIndex(proj => proj.id === updated.id);
    //replacing old with new
    props.projectManager.setProjects(props.projectManager.projects.splice(index, 1, updated));
    //makes network call to update DB
    props.projectManager.updateProjects()
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
    // await props.projectManager.setProjects(props.projectManager.projects.splice(index, 1, updated));
    //makes network call to update DB
    await props.projectManager.updateProjects()
    }
    
  }

  useEffect(() => {
    handleCount()
  }, []);

  return (
    
    <List className={classes.root}>
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
                // index={++index}
                 value={index}
                onChange={(e)=>handleChange(e.target.value)}
                // disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={subgoal.subGoal} />
              <CloseIcon 
                onClick={() => deleteSubgoal(index)}
                color="secondary"
                fontSize="small"
                />
          </ListItem>
        );
        
      })}
      
    </List>

  );
}
