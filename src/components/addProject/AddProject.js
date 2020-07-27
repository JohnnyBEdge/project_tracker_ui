import React, {useState} from 'react';


import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';


const AddProject = (props) => {

    const [hideInput, setHideInput] = useState(false);

    const handleInput = () => setHideInput(!hideInput);

    const handleSubmit = (projName) => {
        console.log(projName)
        props.addProjectHandler(projName);
        setHideInput(!hideInput);
    };


    const newProjectInput = hideInput ? 
        <TextField
            id="outlined-required"
            color="white"
            placeholder="New Project Name"
            variant="filled"
            color="secondary"
            onKeyPress={ (e) => {
                if(e.key === 'Enter'){
                    handleSubmit(e.target.value);
                }
            }}
        // onKeyDown={(target)=>handleSubmit(target.value)}
        />
        : ""


    return(
        <div className={"add-btn-container"}>
            <Tooltip title="New Project" placement="left">
                <AddIcon onClick={() => handleInput()}/>
            </Tooltip>
            {newProjectInput}
            
        </div>
    )
};

export default AddProject;