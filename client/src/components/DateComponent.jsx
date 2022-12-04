import React from 'react'
import { useEffect, useState }  from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import config from '../config/Config'

export const DateComponent = ({person}) => {
  const [user, setUser] = useState([]);
  

  let navigate = useNavigate();
  useEffect(()=>{
		Axios.get(`http://localhost:${config.serverPort}/isLoggedIn`, {
			headers:{
				"x-access-token": localStorage.getItem("token")
			}
		}).then((response)=>{
			console.log(response)
			if(!response.data.loggedin){
				navigate("/login")
			}
      else{
      getUser()
    }

		})
	}, [])

  async function getUser(){
    const response = await fetch(`http://localhost:${config.serverPort}/refineDate?id=${localStorage.getItem("user_id")}`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    var user = await response.json();

    console.log("userrrr", user.user)
    user = user.user
    if(user===undefined){
      navigate("/noMatch");
    }
    console.log(user, " User ", user.length)
    setUser(user);
  }
  
  
  const logout = () =>{
    console.log("logout is called")
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    console.log(sessionStorage.getItem("token"), "here is the token")
    navigate("/login")
  }

  const moreLikeThis =async()=>{
    console.log("more like this clicked")
    console.log(localStorage.getItem("user_id"))
    console.log(user[0].id)
    const response = await fetch(`http://localhost:${config.serverPort}/moreLikeThis?current_user_id=${localStorage.getItem("user_id")}&matched_user_id=${user[0].id}`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    //var resp = await response.json()
    console.log("received vector from more like this")
    getUser();
  }

  const lessLikeThis =async()=>{
    console.log("less like this clicked")
    console.log(localStorage.getItem("user_id"))
    console.log(user[0].id)
    const response = await fetch(`http://localhost:${config.serverPort}/lessLikeThis?current_user_id=${localStorage.getItem("user_id")}&matched_user_id=${user[0].id}`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    //var resp = await response.json()
    console.log("received vector from less like this")
    getUser();
  }

  const setUpDate = async()=>{
    console.log("set up date clicked")
    navigate("/setUpDate", 
      { state:
        { date_firstname: user[0].firstname,
          date_lastname: user[0].lastname,
          date_email: user[0].email
        }
      });
  }

  return (
    <Container maxWidth="sm">
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
        <Button color={"secondary"} variant="contained" onClick={logout}>Sign Out</Button>
        </div>
        <h1> Welcome {localStorage.getItem('name')}!</h1>
        <h3> Suggested Date</h3>
        <p>Name: {user.length>0 ? (user[0].firstname + " " + user[0].lastname) :("no match")} </p>
        <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
    >
      <Button color={"primary"} variant="contained" onClick={moreLikeThis}>More Like This</Button>
      <Button color={"primary"} variant="contained"onClick={lessLikeThis}>Less Like This</Button>
      <Button color={"primary"} variant="contained"onClick={setUpDate}>Set Up a Date</Button>
    </Box>
    </Container>
  )
}
