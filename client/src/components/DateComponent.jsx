import React from 'react'
import { useEffect, useState }  from 'react';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

export const DateComponent = ({person}) => {
  let navigate = useNavigate();
  useEffect(()=>{
		Axios.get(`http://localhost:8888/isLoggedIn`, {
			headers:{
				"x-access-token": localStorage.getItem("token")
			}
		}).then((response)=>{
			console.log(response)
			if(!response.data.loggedin){
				navigate("/login")
			}
		})
	}

	)

  const logout = () =>{
    console.log("logout is called")
    localStorage.removeItem("token")
    console.log(sessionStorage.getItem("token"), "here is the token")
    navigate("/login")
  }
  return (
    <Container maxWidth="sm">
       
        <Button color={"secondary"} variant="contained" onClick={logout}>Sign Out</Button>
        <p>Name: {person.name}</p>
        <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
    >
      <Link href="#">More Like This</Link>
      <Link href="#">Less Like This</Link>
      <Link href="#">Set up a Date!</Link>
    </Box>
    </Container>
  )
}
