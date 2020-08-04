import React from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ProjectTitle(props) {


  return (
    <div>
        <ArrowBackIosIcon
            onClick={() => props.handlePrev()}
            // className={classes.arrow}
            />
        Project: {props.currentProject.projName}
        
        <ArrowForwardIosIcon
            onClick={() => props.handleNext()}
            // className={classes.arrow}
            />
    </div>
  );
}