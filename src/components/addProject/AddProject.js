import React from 'react';


import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';


const AddProject = () => {
    return(
        <div className={"add-btn-container"}>
            <Tooltip title="New Project" placement="left">
                <AddIcon/>
            </Tooltip>
            
        </div>
    )
};

export default AddProject;