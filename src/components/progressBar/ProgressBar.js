import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

export default function ProgressBar(props) {

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 10,
    width: '90%',
    margin: '0 auto',
    border: 'solid black 1px'
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: props.progress === 100 ? '#76ff03' : '#00b0ff'
  },
}))(LinearProgress);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress 
        className={classes.bar}
        variant="determinate" 
        value={props.progress} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 15
  }
});
