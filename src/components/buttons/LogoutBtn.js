import React from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";




const LogoutBtn = (props) => {
    let history = useHistory();

    const handleLogout = async () => {
        try{
            if(window.confirm("Log out?")){
                Auth.signOut();
                props.auth.setIsAuthenticated(false);
                props.auth.setUser(null);
                history.push('/login')
            }
            // history.push('/login')
        } catch(error){
            console.log(error.message)
        }
    };

    return(
        <div>
            <Tooltip title="Log Out" >
                <ExitToAppIcon
                    onClick={handleLogout}
                    style={{ padding: '5px' }}
                    />
            </Tooltip>
            
        </div>
    )
};

export default LogoutBtn;