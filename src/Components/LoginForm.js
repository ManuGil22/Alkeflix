// Libraries
import React from "react";

// Stylesheets
import '../Stylesheets/LoginForm.css';

function LoginForm() {
    return(
        <div className="container">
            <h2 className="login-header">Login Form</h2>
            <form className="form-container">
                <label className="label-container">
                    <span className="form-label">Email</span>
                    <input className="form-input" type="email" id="email" name="email" autoFocus></input>
                </label>
                <label className="label-container">
                    <span className="form-label">Password</span>
                    <input className="form-input" type="password" id="password" name="password"></input>
                </label>
                <button className="btn btn-success" type="submit">Enter</button>
            </form>
        </div>
    )
}

export default LoginForm;