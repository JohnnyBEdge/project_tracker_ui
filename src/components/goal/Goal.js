import React, {useState} from 'react';
import ProjectTitle from '../projectTitle/ProjectTitle';
import AboutAccordion from '../aboutProject/AboutAccordion';
import ProgressBar from '../progressBar/ProgressBar';
import Checkbox from '@material-ui/core/Checkbox';
import GoalHeader from '../goal/GoalHeader';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SubGoalList from './SubGoalList';


export default function Goal(props) {
  const [numChecked, setNumChecked] = useState(0)

  const totalChecked = () => {
      
  }


  const classes = useStyles();

  return (
    <div className="goal-container">
        <GoalHeader 
          projectManager={props.projectManager}
          goalDetails={props.goalDetails}
          totalChecked={totalChecked}
          index={props.index}/>
        <AboutAccordion
            about={props.goalDetails.goalDesc}
            details={
                <SubGoalList
                    goalDetails={props.goalDetails}
                    index={props.index}
                    // checkedBox={checkedBox}
                />}
            />
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