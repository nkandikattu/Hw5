import React, { useState } from 'react';
import Axios from 'axios';
function SignUp(){
    
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
    }
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
}
export default SignUp;