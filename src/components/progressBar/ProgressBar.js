import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);




const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "80%",
    margin: "0 auto",
    padding: 15
  },
});

export default function ProgressBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={50} /> 
      {/* number of goals should be inline with progress bar */}
      # Goals: {props.currentProject.goals.length}
    </div>
  );
}