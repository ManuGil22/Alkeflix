// Libraries
import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate, Navigate } from 'react-router-dom';

// Stylesheets
import '../Stylesheets/LoginForm.css';

function LoginForm() {

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === ''){
            swAlert(<h2 className='swAlert'>Inputs cannot be empty!</h2>)
            return
        }

        if ( !regexEmail.test(email) ){
            swAlert(<h2 className='swAlert'>Please use a valid email</h2>)
            return
        }

        // Only valid to use alkemy credentials
        if (email !== 'challenge@alkemy.org' || password !== 'react'){
            swAlert(<h2>Wrong email or password</h2>);
            return
        }

        axios
            .post('http://challenge-react.alkemy.org', {email, password})
            .then( res => {
                swAlert(<h2 className='swAlert'>Succesfully logged in!</h2>)
                const token = res.data.token;
                sessionStorage.setItem('token', token);
                navigate('/movies');
            })
    }

    let token = sessionStorage.getItem('token');

    return(
        <>

            { token && <Navigate to="/movies" /> }
            
            <div className="container">
                <h2 className="login-header">Login Form</h2>
                <form className="form-container" onSubmit={submitHandler}>
                    <label className="label-container">
                        <span className="form-label">Email</span>
                        <input className="form-input" type="text" id="email" name="email" autoFocus></input>
                    </label>
                    <label className="label-container">
                        <span className="form-label">Password</span>
                        <input className="form-input" type="password" id="password" name="password"></input>
                    </label>
                    <button className="btn btn-success" type="submit">Enter</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm;