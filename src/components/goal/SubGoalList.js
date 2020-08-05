import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


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
  console.log("project details",projectDetails.subGoals)

// const count = projectDetails.subGoals.filter(subgoal => subgoal.checked).length;



  const handleCount = () => {
      return projectDetails.subGoals.filter(subgoal => subgoal.checked).length;

  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    handleCount()
  }, []);

  return (
    <List className={classes.root}>
      {props.goalDetails.subGoals.map((subgoal) => {
        const labelId = `checkbox-list-label-${subgoal}`;
        // const isChecked = subgoal.checked ? true : false
        // const value = subgoal.checked ? 1 : 0
        
        return (
          
          <ListItem 
            key={subgoal} 
            role={undefined} 
            dense 
            button 
            
            // onClick={() => handleToggle(value)}
            >
            <ListItemIcon>
              <Checkbox
                // value={value}
                edge="start"
                // checked={isChecked}
                // checked={checked}
                tabIndex={-1}
                onChange={handleChange}
                // disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={subgoal.subGoal} />
          </ListItem>
        );
      })}
    </List>

  );
}
