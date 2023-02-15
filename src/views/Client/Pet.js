import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { NavBar } from "../../components/NavBar";
import { customFetch, handleServerError } from "../../utils/helpers";
import { useAuthDispatch, useAuth } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import NavBarTemporal from "../../components/NavBarTemporal";
import { createPetSchema } from "../../validationModels/createPetSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

const Pet = () => {
  const dispatch = useAuthDispatch();
  const auth = useAuth();
  const [pet, setPet] = useState([]);


  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ mode: "all", resolver: joiResolver(createPetSchema) });


  const onSubmit = (formValues) => {
    const idPets = pet.map((d) => { return d.id })
    postPet({ ...formValues, id: idPets });
  };

  const onError = (errors, e) => console.log(errors, e);

  const getPet = () => {
    customFetch("GET", "api/Pet", auth.token)
      .then((response) => {
        const error = handleServerError(dispatch, response);
        if (error) {
          return;
        }
        return response.json();
      })
      .then((body) => {
        setPet(body.map((d) => { return { type: d.type, name: d.name, id: d.id, age: d.age, weight : d.weight, castrated: d.castrated } }));
        console.log(body);
        console.log(pet);
      })
      .catch((er) => {
        console.log(er);
        toast.error("Ocurrió un error");
      });
  };

  

  const postPet = () => {
    axios
      .post(baseUrl + "api/pet", {
        pet
      })
      .then((res) => console.log("succes", res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     getPet(); 
  }, []);

  return (
    <div>
      <NavBarTemporal />
      <NavBar />

      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="d-flex justify-content-center align-items-center mt-5 mb-4">
          Cargá tu mascota
        </h1>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-50 form-login square border pt-4"
        >
          <Form.Group className="mb-3">
            <Form.Label>Perro o gato?</Form.Label>
            <Form.Control type="text" {...register("petType")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...register("petName")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Edad"
              {...register("petAge")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              type="number"
              placeholder="Peso"
              {...register("petWeight")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Esta castrado?</Form.Label>
            <Form.Control {...register("isCastrated")} />
          </Form.Group>

          <Button
            className="m-1 btn-login btn btn-dark w-100"
            variant="primary"
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Pet;
