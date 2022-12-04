import React from "react";
import {useLocation} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import config from '../config/Config'

export const SetUpDate =()=>{
    const location = useLocation();

    let navigate = useNavigate();
    const backButton = async()=>{
        navigate('/refineDate')
    }

    return(
        <Container maxWidth="sm">
        <div style={{display: 'flex', justifyContent:'center'}}>
        </div>
        <div>
            <h1>Set up a Date!</h1>
            <h3>{location.state.date_firstname} {location.state.date_lastname}</h3>
            <p>Contact at: {location.state.date_email} to plan your first date!</p>
        </div>
        <Button color={"primary"} variant="contained" onClick={backButton}>Back to Home</Button>
        </Container>
    )
}