import { baseUrl } from "../utils/constants";
import React, { useEffect, useContext, useState } from "react";
import { useAuthDispatch, useAuth } from "../context/AuthContextProvider";
import axios from "axios";
import { Form, Button, Container, Nav, Navbar } from "react-bootstrap";
import "./Login.css";
import imgLogo from "../img/golden-login.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
 import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../validationModels/loginSchema";
import { toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const auth = useAuth();

  const goToForm = () => navigate("/signUp");
  const goToView = () => navigate("/Main");

  const onSubmit = (formValues) => {
        const { email, password } = formValues;
    dispatch.login(email, password);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(loginSchema),
  });

  useEffect(() => {
    if (auth.loginError !== "" && !auth.waitingLogin) {
      toast.error(auth.loginError);
      dispatch.clear();
    }
  }, [auth.loginError, auth.waitingLogin]);



  return (
    <div className="main-container-login">
      <h1 className="title-login">Veterinaria Shop</h1>
      <Container className="mt-5 d-flex justify-content-center align-items-center container-login">
        <div className="w-100 p-0 m-0 img-logo">
          <img src={imgLogo} />
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          id="sing-in-form"
          className="w-100 form-login"
        >
          <h1 className="d-flex justify-content-center align-items-center mb-5">
            Inicie sesion
          </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              autoComplete="username"
              {...register("email")}
              type="email"
              placeholder="Enter email"
            />
            <div
              className={`${errors.email ? "show-error" : "hide-error"} error`}
            >
              {errors.email ? `${errors.email?.message}` : ""}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              size="lg"
              autoComplete="password"
              {...register("password")}
              placeholder="Password"
            />
             <div
              className={`${
                errors.password ? "show-error" : "hide-error"
              } error`}
            >
              {errors.password ? `${errors.password?.message}` : ""}
            </div>
          </Form.Group>
          <Button
            className="btn-login btn btn-dark"
            variant="primary"
            type="submit"
             onClick={ true && goToView} 
            disabled={auth.waitingLogin}
            >
              { auth.waitingLogin ? 'INGRESANDO...' : 'INGRESAR'}
          </Button>
          <Button
            className="m-1 btn-login btn btn-dark"
            variant="primary"
            type="submit"
            onClick={goToForm}
          >
            Registrarse
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
