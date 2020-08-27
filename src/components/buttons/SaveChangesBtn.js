import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const SaveChangesBtn = (props) => {
    const classes = useStyles();
    return(
        <div>
            <Button 
                className={classes.saveChanges}
                onClick={props.update}>
                    Save Changes
            </Button>
        </div>
    )
};

const useStyles = makeStyles(() => ({
    saveChanges: {
        height: 50,
        backgroundColor: "#77FF00",
        width: "100%",
        fontSize: 25,
        fontWeight: 300,
        border: "1px solid black",
        borderRadius: 3
    }
  }));

export default SaveChangesBtn;