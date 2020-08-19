import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SubGoalList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  const projectDetails = props.goalDetails;


// const count = projectDetails.subGoals.filter(subgoal => subgoal.checked).length;



  const handleCount = () => {
      return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;

  };

  const handleChange = (checkboxIndex) => {
    const updatedCheckedStatus = !props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].checked;
    props.projectManager.currentProject.goals[props.index].subGoals[checkboxIndex].checked = updatedCheckedStatus
    const updated = props.projectManager.currentProject
    const index = props.projectManager.projects.findIndex(proj => proj.id === updated.id);
    props.projectManager.setProjects(props.projectManager.projects.splice(index, 1, updated));
    props.projectManager.updateProjects()
  };
  

  const deleteSubgoal = (idx) => {
    alert("index: ", idx)
  }

  useEffect(() => {
    handleCount()
  }, []);

  let index = 0;

  return (
    
    <List className={classes.root}>
      {props.goalDetails.subGoals.map((subgoal) => {
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
                checked={subgoal.checked}
                // index={++index}
                 value={index++}
                onChange={(e)=>handleChange(e.target.value)}
                // disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={subgoal.subGoal} />
            {/* <button 
              onClick={() => deleteSubgoal()}>Delete</button> */}
              <ButtonBase onClick={() => deleteSubgoal(index)}>Delete</ButtonBase>
          </ListItem>
        );
        
      })}
      
    </List>

  );
}
