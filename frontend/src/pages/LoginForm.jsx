import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { storeCookie } from "../utils";

export default function LoginForm() {
  const [form, setForm] = useState({username: "", password: ""})
  const [errors,setErrors] = useState(null)
  const navigate = useNavigate();
  function handleChange(e){
    setForm({...form, [e.target.id]: e.target.value});
  }
  async function validateForm(form) {
    const { username, password } = form;
    const errors = { username: "", password: "" };

    if (!username.trim()){
      errors.username = "Username is required";
    }
    if(!password.trim()){
      errors.password = "Password is required";
    }
    setErrors(errors);
    if(!errors.username && !errors.password){
      let response = await login(username.trim(),password.trim());
      if(response){
        storeCookie("sessionToken",response.accessToken);
        navigate("/");
      }
    }
  }
  function loginUser(e){
    e.preventDefault();
    validateForm(form);
  }
  return (
    <div className="card main-form">
      <div className="card-header">
        <h3>Login</h3>
      </div>
      <div className="card-body">
        <form onSubmit={(e) => loginUser(e)}>
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
        <span>Don't have an account? </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
    )
}
