import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { FormLabel, RadioGroup, FormControlLabel, Radio, Button, Avatar, Container, Grid, Paper, Typography, TextField } from '@mui/material';

var config = require('../../../server/configs/Config.js');

function SignUp(){

    let navigate = useNavigate();
    useEffect(()=>{
		Axios.get(`http://localhost:${config.serverPort}/isLoggedIn`, {
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
    const [q1, setq1] = useState(1);
    const [q2, setq2] = useState(1);
    const [q3, setq3] = useState(1);
    const [q4, setq4] = useState(1);
    const [q5, setq5] = useState(1);
    const [q6, setq6] = useState(1);
    const [q7, setq7] = useState(1);
    const [q8, setq8] = useState(1);
    const [q9, setq9] = useState(1);
    const [q10, setq10] = useState(1);


    const signup = ()=>{
        Axios.post(`http://localhost:${config.serverPort}/signup`, {
            firstname: firstName,
            lastname: lastName,
            emailid: emailId,
            password: password,
            q1: q1,
            q2: q2,
            q3: q3,
            q4: q4,
            q5: q5,
            q6: q6,
            q7: q7,
            q8: q8,
            q9: q9,
            q10: q10
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
                <Grid align='left' p={2}>
                <FormLabel>Do you like music?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq1(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq1(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you prefer week night dates?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq2(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq2(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you enjoy eating?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq3(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq3(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Are you a pet lover?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq4(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq4(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you enjoy making people laugh?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq5(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq5(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you like cooking?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq6(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq6(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Did you find schooling boring?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq7(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq7(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you like to travel?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq8(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq8(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Do you like to read?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq9(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq9(2)
                    }}/>
                </RadioGroup>
                </Grid>
                <Grid align='left' p={2}>
                <FormLabel>Are you good with secrets?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={()=>{
                        setq10(1)
                    }}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" onClick={()=>{
                        setq10(2)
                    }}/>
                </RadioGroup>
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