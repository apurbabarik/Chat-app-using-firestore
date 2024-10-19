import React from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signup,login } from "../../config/firebase";
const Login = () => {
  const [currstate, setcurrstate] = useState("Sign-Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    if(currstate==="Sign-Up"){
      signup(userName,email,password)
    }
    else{
      login(email,password)
    }
    
  }
  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" />
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currstate}</h2>
        {currstate === "Sign-Up" ? (
          <input
            type="text"
            onChange={(e)=>setUserName(e.target.value)}
            value={userName}
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">
          {currstate === "Sign-Up" ? "Create Account" : "Login Now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms and condition</p>
        </div>
        <div className="login-forget">
          {currstate === "Sign-Up" ? (
            <p className="login-toogle">
              Already have an account?
              <span onClick={() => setcurrstate("Login")}>click here</span>
            </p>
          ) : (
            <p className="login-toogle">
              Create an account
              <span onClick={() => setcurrstate("Sign-Up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
