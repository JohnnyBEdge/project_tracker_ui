import React from 'react';
import ProjectTitle from 'components/projectTitle/ProjectTitle';
import AboutAccordion from 'components/aboutProject/AboutAccordion';
import ProgressBar from 'components/progressBar/ProgressBar';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';





export default function ProjectHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="new-proj-btn">
        <AddIcon />
      </div>

      <div className="title-container">
        <ProjectTitle 
          currentProject={props.currentProject}
          handleNext={props.handleNext}
          handlePrev={props.handlePrev}/>
      </div>

      <div className="progress-bar">
        <ProgressBar />
      </div>

      <div className="about-accordion">
        <AboutAccordion />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));