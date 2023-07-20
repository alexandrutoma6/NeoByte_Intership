import React, { useState } from "react";
//import axios from "axios";
export const Login = (props) =>{
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showMessage, setShowMessage] = useState(false)


    //hard-coded email and password for testing
    const userEmail = 'a_tomaaa@yahoo.com';
    const userPassword = '1234'

    //
    //console.log(email, pass)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //const userData = axios.post('http://localhost:3000/login', { email: email, pass: pass })


        //if the email and password entered match ===>> switch to the validation page
        if(email === userEmail && pass === userPassword){
            console.log('Email and Password CORRECT');
            props.onFormSwitch('validation');
        }
        else{
            console.log('Email of Password INCORRECT');
            setShowMessage(true);
        }
    }

    return(
        <div className="auth-form-conainer">
        <form className="login-form" onSubmit={handleSubmit}>
            <label for = "email"> email </label>  
            <input value = {email} onChange={(e) => setEmail(e.target.value)} type = "Email" placeholder="Enter your email" id= "email" name = "email"/>
            <label for = "password"> password </label>  
            <input value = {pass} onChange={(e) => setPass(e.target.value)} type = "Password" placeholder="*******" id= "password" name = "password"/>
            <button type="submit">Log In</button>
            {showMessage && (
                <div>
                    <p>Email of Password INCORRECT</p>
                </div>
            )}
        </form>
        </div>
    )
}