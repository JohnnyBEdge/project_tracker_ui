import React from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import classes from '*.module.css';
import { makeStyles } from '@material-ui/core/styles';

export default function ProjectTitle(props) {

const classes = useStyles();
  return (
    <div className={classes.titleContainer}>
        <ArrowBackIcon
          className={classes.arrow}
          onClick={() => props.handlePrev()}
            />

        <p className={classes.projectName}>{props.projectManager.currentProject.projName}</p>

        <ArrowForwardIcon
          className={classes.arrow}
          onClick={() => props.handleNext()}
            />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between"
  },
  projectName: {
    fontSize: 25,
    fontWeight: 800
  },
  arrow: {
    fontSize: 30,
    marginTop: 20
  }
}));