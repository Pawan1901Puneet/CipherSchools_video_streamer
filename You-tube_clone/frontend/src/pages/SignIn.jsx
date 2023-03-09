import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSucces } from "../redux/userSlice";
import {auth, provider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const [signup,setSignup] = useState({
    username : '',
    email : '',
    password : ''
  });

  const [login,setLogin] = useState({
    email : '',
    password : ''
  });
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginChangeHandler = e => {
    const {name , value} = e.target;
    setLogin((prev) => ({
      ...prev,
      [name] : value
    }));
  }

  const signupChangeHandler = e => {
    const {name , value} = e.target;
    setSignup((prev) => ({
      ...prev,
      [name] : value
    }));
  }

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginStart());

    fetch('http://localhost:8080/auth/signin',{
      method : 'POST',
      credentials: 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : login.email,
        password : login.password
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      dispatch(loginSucces(result.user));
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      dispatch(loginFailure());
    });

  }

  const signupHandler = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/auth/signup',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : signup.email,
        name : signup.username,
        password : signup.password
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  }

  const googleHandler = () => {
    dispatch(loginStart());
    signInWithPopup(auth,provider)
    .then(result => {

        return fetch('http://localhost:8080/auth/google',{
        method : 'POST',
        credentials: 'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          email : result.user.email,
          img : result.user.photoURL,
          name : result.user.displayName,
        })
      });
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      dispatch(loginSucces(result.user));
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      dispatch(loginFailure());
    });
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to PawanTube</SubTitle>
        <Input placeholder="email" value={login.email} name="email" onChange={loginChangeHandler} />
        <Input type="password" placeholder="password" value={login.password} name="password" onChange={loginChangeHandler} />
        <Button onClick={loginHandler}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={googleHandler}>Sign in with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" name="username" value={signup.username} onChange={signupChangeHandler} />
        <Input type="email" placeholder="email" name="email" value={signup.email} onChange={signupChangeHandler} />
        <Input type="password" placeholder="password" name="password" value={signup.password} onChange={signupChangeHandler} />
        <Button onClick={signupHandler}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
