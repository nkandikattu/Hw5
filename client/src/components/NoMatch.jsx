import React from "react";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import config from '../config/Config'
export const NoMatch =()=>{
    let navigate = useNavigate();
    const reset = async()=>{
        const response = await fetch(`http://localhost:${config.serverPort}/reset?id=${localStorage.getItem("user_id")}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        navigate('/refineDate')
    }
    return(
        <div>
            <p> Sorry! No more matches left. You can reset the list by clicking the below button.</p>
            <div>
            <Button color={"primary"} variant="contained" onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}
