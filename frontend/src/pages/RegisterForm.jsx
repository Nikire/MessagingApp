import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { storeCookie } from "../utils";

export default function RegisterForm() {
  const [form, setForm] = useState({username: "", password: ""})
  const [errors,setErrors] = useState(null)
  const navigate = useNavigate();
  function handleChange(e){
    setForm({...form, [e.target.id]: e.target.value});
    validateForm({...form, [e.target.id]: e.target.value});
  }
  async function validateForm(form,submiting = false) {
    const { username, password } = form;
    const errors = { username: "", password: "" };
    let usernameRegEx = /^[a-zA-Z0-9_]{3,20}$/;
    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

    if (!usernameRegEx.test(username.trim())) {
      errors.username = "Username must be alphanumeric and between 3 to 20 characters";
    }

    if (!passwordRegEx.test(password.trim())) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 5 characters long";
    }
    setErrors(errors);
    if(submiting){
      if(!errors.username && !errors.password){
        let response = await register(username.trim(),password.trim());
        if(response){
          storeCookie("sessionToken",response.accessToken);
          navigate("/");
        }
      }
    }
  }
  function registerUser(e){
    e.preventDefault();
    validateForm(form,true);
  }
  return (
    <div className="card main-form">
      <div className="card-header">
        <h3>Register</h3>
      </div>
      <div className="card-body">
        <form onSubmit={(e) => registerUser(e)}>
          <div className="form-group position-relative mb-3">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={handleChange} className={`form-control ${errors ? errors?.username ? "is-invalid" : "is-valid" : ""}`} id="username" placeholder="Enter username" />
            <div className="invalid-feedback">
              {errors?.username}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={handleChange} className={`form-control ${errors ? errors?.password ? "is-invalid" : "is-valid" : ""}`} id="password" placeholder="Password" />
            <div className="invalid-feedback">
              {errors?.password}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>  
      <div className="card-footer text-muted">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
    )
}
