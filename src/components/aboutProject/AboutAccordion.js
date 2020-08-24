import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


export default function AboutAccordion(props) {

  const classes = useStyles();

  return (
    <div>
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {props.about}
        </Typography>
        
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {props.details}
          {/* {props.currentProject.projDesc} */}
        </Typography>
      </AccordionDetails>
    </Accordion>

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
    margin: "0 auto"
  },
}));