import React, {useState} from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';


const AddGoalForm = (props) => {

    const [goalName, setGoalName] = useState('');
    const [goalDesc, setGoalDesc] = useState('');
    const [subGoals] = useState([]);
    const [open, setOpen] = useState(false); 

    let projects = props.projectManager.projects;

    const toggleModal = () => {
        setOpen(!open)
    };

  async function addGoal(){
      //creates new goal
    let newGoal = {goalName, goalDesc, subGoals}
    //adds new goal to current projects goal list
    await props.projectManager.currentProject.goals.push(newGoal);
    //puts updated projects into variable
    let updated = props.projectManager.currentProject
    //finds old project by its name and returns the index
    const index = projects.findIndex(proj => proj.projName === updated.projName);
    console.log("PROJECT INDEX: ", index)
    //replaces old project copy with updated
    await projects.splice(index, 1, updated);
    await props.projectManager.setProjects([...props.projectManager.projects]);
    //displays save changes button
    await props.projectManager.saveChanges(true);
        toggleModal();
  };

  const classes = useStyles();
    return (
        <div id="add_goal_form_container">
        <Tooltip title="Add New Goal" aria-label="add">
            <AddCircleIcon 
                className={classes.addGoalBtn}
                color="primary" 
                fontSize="small" 
                onClick={toggleModal}/>
          </Tooltip>
            <Modal
                open={open}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >

                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Add New Goal</h2>
                    <FormControl 
                        variant="outlined"
                        fullWidth={true}
                        required={true}>
                        <InputLabel>Goal Name</InputLabel>
                        <OutlinedInput 
                            className={classes.input}
                            id="component-outlined" 
                            value={goalName} 
                            onChange={({target}) => {
                                setGoalName(target.value)
                            }}
                            label="eventName" 
                            />
                    </FormControl>
            <br/>

                    <FormControl 
                        className={classes.input}
                        fullWidth={true}
                    >
                        <TextField
                            fullWidth={true}
                            id="outlined-multiline-flexible"
                            label="Goal Description"
                            multiline
                            rowsMax={4}
                            value={goalDesc} 
                            onChange={({target}) => {
                                setGoalDesc(target.value)
                            }}
                            variant="outlined"
                            />
                    </FormControl>

                <Button
                    className={classes.editButton}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon /> }
                    onClick={() => addGoal()}
                >Add New Goal
                </Button>                                               
                </div>


            </Modal>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: 100,
    },
    input: {
        margin: theme.spacing(1,0,1),
        width: "98%"
    },
    modal: {
        marginTop: "-40px",
        width: "95vw",
        margin: "0 auto"
    },
    editButton: {
        backgroundColor: "#6772e5",
        color: "#fff",
        width: "100%",
        boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
        height: "60px",
        margin: "0 auto",
        marginTop: "15px"
    },
    addGoalBtn:{ 
        paddingLeft: 15,
        marginTop: 10
    } 
  }));

export default AddGoalForm;