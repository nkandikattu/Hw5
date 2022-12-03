import React,{ useEffect, useState }  from 'react';
import {
	Container,
	Button,
	Grid,
	Paper,
	TextField,
	IconButton,
	InputAdornment,
	Link
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Axios from 'axios'
import {useNavigate} from 'react-router-dom';



function LoginVulnerable(){
	useEffect(()=>{
		Axios.get(`http://localhost:8888/isLoggedIn`, {
			headers:{
				"x-access-token": localStorage.getItem("token")
			}
		}).then((response)=>{
			console.log(response)
			if(response.data.loggedin){
				navigate("/")
			}
		})
	}

	)
    let navigate = useNavigate();
    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({
        email: "",
        pass: "",
        showPass: false,
    });
    const checkCreds = ()=>{
        Axios.post(`http://localhost:8888/login`, {email: email, password: password})
        .then((response)=>{
            console.log(response.data);
            if(response.data.auth){
				localStorage.setItem("token", response.data.token)
				navigate("/")
            }
        })
    }
    const handlePassVisibility = ()=>{
        setValues(
            {
                ...values,
                showPass: !values.showPass
            }
        )
    };

    return (
        <div>
            <Container maxWidth="sm">
<Grid
	container
	spacing={2}
	direction="column"
	justifyContent="center"
	style={{ minHeight: "100vh" }}
>
<Paper elelvation={2} sx={{ padding: 5 }}>
<form>
<Grid container direction="column" spacing={2}>
	<Grid item>
		<TextField
			type="email"
			fullWidth
			label="Enter your email"
			placeholder="Email Address"
			variant="outlined"
			required
            onChange={(event)=>{
                setEmailId(event.target.value)
            }}
		/>
	</Grid>

	<Grid item>
	<TextField
		type={values.showPass ? "text" : "password"}
		fullWidth
		label="Password"
		placeholder="Password"
		variant="outlined"
		required
        onChange={(event)=>{
            setPassword(event.target.value)
        }}
		InputProps={{
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={handlePassVisibility}
						aria-label="toggle password"
						edge="end"
					>
						{values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</InputAdornment>
			),
		}}
	/>
	</Grid>

	<Grid item>
	<Button type="submit" fullWidth variant="contained" onClick={checkCreds}>
		Sign In
	</Button>
	<br />
	<Link href="http://localhost:3000/signup" underline="hover">
  		{'SignUp'}
	</Link>
	<br />
	<Link href="http://localhost:3000/login" underline="hover">
  		{'Login'}
	</Link>
	</Grid>
</Grid>
</form>
</Paper>
</Grid>
</Container>
        </div>
    )
}
export default LoginVulnerable;