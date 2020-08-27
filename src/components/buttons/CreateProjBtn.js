import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

const CreateProjBtn = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false); 
    const [projName, setProjName] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [goals] = useState([]);


    const toggleModal = () => {
        setOpen(!open)
    };

    async function addProject(){
        //creates new goal
      let newProj = {projName, projDesc, goals}
    //   //adds new proj to current projects goal list
    //   await props.projectManager.projects.push(newProj);
    //   //puts updated projects into variable
    //   let updated = props.projectManager.currentProject
    //   //finds old project by its name and returns the index
    //   const index = projects.findIndex(proj => proj.projName === updated.projName);
    //   console.log("PROJECT INDEX: ", index)
    //   //replaces old project copy with updated
    //   await projects.splice(index, 1, updated);
      await props.projectManager.setProjects([...props.projectManager.projects,newProj]);
    //   await props.projectManager.setCurrent(props.projectManager.projects.length + 1);
    //   //displays save changes button
      await props.projectManager.saveChanges(true);

          toggleModal();
    };

    return(
        <div>
            <Button 
                className={classes.addProjBtn}
                // variant="outlined"
                fullWidth="true"
                onClick={toggleModal}>
                + New Project
            </Button>

            <Modal
                open={open}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >

                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Add New Project</h2>
                    <FormControl 
                        variant="outlined"
                        fullWidth={true}
                        required={true}>
                        <InputLabel>Project Name</InputLabel>
                        <OutlinedInput 
                            className={classes.input}
                            id="component-outlined" 
                            value={projName} 
                            onChange={({target}) => {
                                setProjName(target.value)
                            }}
                            label="ProjName" 
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
                            label="Project Description"
                            multiline
                            rowsMax={4}
                            value={projDesc} 
                            onChange={({target}) => {
                                setProjDesc(target.value)
                            }}
                            variant="outlined"
                            />
                    </FormControl>

                <Button
                    className={classes.add}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon /> }
                    onClick={() => addProject()}
                >Add New Project
                </Button>                                               
                </div>


            </Modal>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    addProjBtn: {
        fontSize: 15,
        color: "white",
        width: 150
    },
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
      }
  }));



export default CreateProjBtn;

