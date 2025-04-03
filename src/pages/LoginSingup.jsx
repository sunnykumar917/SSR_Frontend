import React, { useState } from 'react';
import './css/loginsignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
  
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.reload("/");
      } else {
        // Handle unsuccessful login
        console.error("Login failed:", responseData.error);
        // Display an error message to the user
        alert(responseData.error); // Alert the user with the error message
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle error, such as displaying a message to the user
      alert("An error occurred during login. Please try again later."); // Alert the user with a generic error message
    }
  };

  const signUp = async () => {
    console.log("Sign up function executed", formData);
    try {
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.reload("/");
      } else {
        // Handle unsuccessful signup
        console.error("Sign up failed:", responseData.error);
        // Display an error message to the user
        alert(responseData.error); // Alert the user with the error message
      }
    } catch (error) {
      console.error("Error occurred during sign up:", error);
      // Handle error, such as displaying a message to the user
      alert("An error occurred during sign up. Please try again later."); // Alert the user with a generic error message
    }
  };
  
  



  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state === "Sign Up" ? "Sign Up" : "Login"}</h1>
        <div className="login-signup-fields">
          {state === "Sign Up" && <input type="text" placeholder='Username' name='username' value={formData.username} onChange={changeHandler} />}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Id' />
          <div className="password-input">
            <input name='password' value={formData.password} onChange={changeHandler} type={showPassword ? "text" : "password"} placeholder='Password' />
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={togglePasswordVisibility}></i>
          </div>
        </div>
        <div>
          <button onClick={() => { state === "Login" ? login() : signUp() }}>
            {state === "Sign Up" ? "Sign Up" : "Login"} Continue
          </button>
        </div>
        {state === "Sign Up" ?
          <p className='already'>Already have an account?<span onClick={() => { setState("Login") }}>Login here</span></p> :
          <p className='already'>Create an account?<span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className="loginsingup-agree">
          <input type="checkbox" name="" id="" />
          <p >Agree to our terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
