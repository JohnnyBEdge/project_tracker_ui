import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

export default function ProgressBar(props) {

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 10,
    width: '80%',
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




  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      width: "80%",
      margin: "0 auto",
      padding: 15
    },
    // bar: {
    //   backgroundColor: props.progress < 30
    //   ? '#4caf50' //green
    //   : '#33bfff', //blue
    //   height: 10,
    //   borderRadius: 5,

    // }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={props.progress} /> 
    </div>
  );
}
