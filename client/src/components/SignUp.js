import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Button, Avatar, Container, Grid, Paper, Typography, TextField } from '@mui/material';
function SignUp(){

    let navigate = useNavigate();
    useEffect(()=>{
		Axios.get("http://localhost:8888/isLoggedIn", {
			headers:{
				"x-access-token": localStorage.getItem("token")
			}
		}).then((response)=>{
			console.log(response)
			if(response.data.loggedin){
				navigate("/")
			}
		})
	})
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const signup = ()=>{
        Axios.post("http://localhost:8888/signup", {
            firstname: firstName,
            lastname: lastName,
            emailid: emailId,
            password: password
        }).then((response)=>{
            console.log(response)
        })
        navigate("/login");
    }
    return(
        <div>
            <Container maxWidth="sm">
                <Grid
                    container
                    spacing={2}
                    direction='column'
                    justifyContent='center'
                    style={{minHeight: '100vh'}}
                >
                <Paper elevation={2} sx={{padding: 5}}>
                <Grid container direction='column' spacing={2}>
                <Grid align='center'>
                <Avatar>

                </Avatar>
                <h2>
                    Sign Up
                </h2>
                <Typography variant='caption'>Please fill the form to create an account</Typography>
                </Grid>
                <Grid item>
		            <TextField
			            type="name"
			            fullWidth
			            label="Enter your First Name"
			            placeholder="First Name"
			            variant="outlined"
			            required
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}
		            />
	            </Grid>
                <Grid item>
		            <TextField
			            type="name"
			            fullWidth
			            label="Enter your Last Name"
			            placeholder="Last Name"
			            variant="outlined"
			            required
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}
		            />
	            </Grid>
                <Grid item>
		            <TextField
			            type="name"
			            fullWidth
			            label="Enter your Email Id"
			            placeholder="Email Id"
			            variant="outlined"
			            required
                        onChange={(e)=>{
                            setEmailId(e.target.value)
                        }}
		            />
	            </Grid>
                <Grid item>
		            <TextField
			            type="password"
			            fullWidth
			            label="Enter your Password"
			            placeholder="Password"
			            variant="outlined"
			            required
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
		            />
	            </Grid>
                <Grid item>
	            <Button type="submit" fullWidth variant="contained" onClick={signup}>
		        Sign Up
	            </Button>
	            </Grid>
                </Grid>
                </Paper>
                </Grid>
            </Container>
        </div>
    )
    /*
    return (
        <div>
            <label>First Name:</label>
            <input type='text' onChange={(e) =>{
                setFirstName(e.target.value);
            }}/>
            <label>Last Name:</label>
            <input type='text'  onChange={(e) =>{
                setLastName(e.target.value);
            }}/>
            <label>Email:</label>
            <input type='text'  onChange={(e) =>{
                setEmailId(e.target.value);
            }}/>
            <label>Password:</label>
            <input type='password'  onChange={(e) =>{
                setPassword(e.target.value);
            }}/>
            <button onClick={signup}>SignUp</button>
        </div>
    )
    */
}
export default SignUp;