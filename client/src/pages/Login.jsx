import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-transparent.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  axios.defaults.withCredentials = true;
    
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/');
        }
    },[navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
      if (handleValidation()) {
          const { username, password} = values;
          const { data } = await axios.post(loginRoute, {
              username,
              password,
          });
          if (data.status === false) {
              toast.error(data.msg, toastOptions);
              console.log('status fail')
          }
          else if (data.status === true) {
              localStorage.setItem('chat-app-user', JSON.stringify(data.user));
              if (data.user.isAvatarImageSet === true) {
                  navigate("/")
              } else {
                  navigate('/setavatar')
              }
          }
         
    };
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username,  password} = values;
    if (password === "") {
      toast.error("Username and password is required",toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
      }
      console.log("login")
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Wechat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        
          <button type="submit">Login</button>
          <span>
            Don't have an account?<Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #131324;

  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
  }

  img {
    height: 5rem;
    width: 5rem;
  }

  h1 {
    color: white;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000087;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    color: white;
    border: 0.1rem solid #125b9a;
    border-radius: 0.5rem;
    font-size: 1rem;
    width: 100%;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: #125b9a;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      font-weight: bold;
      text-decoration: none;
    }
  }
`;

export default Login;
