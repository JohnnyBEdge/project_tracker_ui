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



const AddSubgoalForm = (props) => {

    const [subGoal, setSubGoal] = useState('');
    const [checked, setChecked] = useState(false);
    // const [subGoals] = useState([]);
    const [open, setOpen] = useState(false); 

    const toggleModal = () => {
        setOpen(!open)
    };

  function addSubgoal(){
    let newSubgoal = {subGoal, checked}
    // props.projectManager.currentProject.goals.push(newGoal);
    // // const indx = props.projectManager.projects.findIndex(el => el.id === updatedProject.id);
    // //     return events.splice(indx, 1, {_id:id, ...updatedEvent})
    // let updated = props.projectManager.currentProject
    // console.log("updated goals",updated)
    // const index = props.projectManager.projects.findIndex(proj => proj.id === updated.id);
    // props.projectManager.setProjects(props.projectManager.projects.splice(index, 1, updated))
    // console.log()
        toggleModal();
  };

  const classes = useStyles();
    return (
        <div id="add_goal_form_container">
        <Tooltip title="Add New Goal" aria-label="add">
            <AddCircleIcon color="primary" fontSize="small" onClick={toggleModal}/>
          </Tooltip>
        <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal2}
            >

            <div className={classes.paper}>
            <h2 id="simple-modal-title">Add Subgoal</h2>
                <FormControl 
                    variant="outlined"
                    fullWidth={true}
                    required={true}>
                    <InputLabel>Subgoal</InputLabel>
                    <OutlinedInput 
                        className={classes.input}
                        id="component-outlined" 
                        value={subGoal} 
                        onChange={({target}) => {
                            setSubGoal(target.value)
                        }}
                        label="eventName" 
                        />
                </FormControl>
            <br/>
                <Button
                    className={classes.editButton}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon /> }
                    // onClick={() => addGoal()}
                >Add Subgoal
                </Button>                                               
                </div>


            </Modal>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
    //   width: "95vw",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: 100,
    //   left: '37%',
    },
    button: {
        margin: theme.spacing(2, 0, 2),
      },
    input: {
        margin: theme.spacing(1,0,1),
        width: "98%"
    },
    modal2: {
        marginTop: "-40px",
        // width: "98%",
        width: 400,
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
        // & :hover {
        //     background-color: "#5469d4"
    } 
  }));

export default AddSubgoalForm;