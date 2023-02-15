
import React, {  useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Login.css";
import imgLogo from "../img/golden-login.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    let navigate = useNavigate();
  
    const goToHome = () => navigate("/");
  
    useEffect(() => {
    }, []);
  
    return (
      <div className="main-container-login">
      
        <h1 className="title-login">Veterinaria Shop</h1> 
        <Container className="mt-5 d-flex justify-content-center align-items-center container-login">
          
          <div className="w-100 p-0 m-0 img-logo">
            <img src={imgLogo} alt=""/>
          </div>
  
          <Form className="w-100 form-login">
            <h1 className="d-flex justify-content-center align-items-center">Registrarse</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="password" placeholder="Nombre" />
            </Form.Group>
            <Button className="m-1 btn btn-dark" variant="primary" type="submit" onClick={goToHome}>
              Registrarse
            </Button>
          </Form>
        </Container>
      </div>
)};

export default SignUp