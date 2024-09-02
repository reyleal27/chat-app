import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <Button onClick={handleClick}><BiPowerOff />
        </Button>
    )
};

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #7A1CAC;
cursor: pointer;
border:none;
&:active{
    background-color: white;}
    svg{
    font-size: 1.3rem;
    color: white;
    }`

export default Logout