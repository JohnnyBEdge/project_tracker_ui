import React from 'react';
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
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = () => () => {
    props.checkedBox()
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {props.goalDetails.subGoals.map((subgoal) => {
        const labelId = `checkbox-list-label-${subgoal}`;
        const isChecked = subgoal.checked === "true" ? true : false

        return (
          <ListItem 
            key={subgoal} 
            role={undefined} 
            dense 
            button 
            // onClick={handleToggle()}
            // onClick={handleToggle(subgoal)}
            >
            <ListItemIcon>
              {isChecked}
              <Checkbox
                edge="start"
                checked={isChecked}
                tabIndex={-1}
                disableRipple
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
