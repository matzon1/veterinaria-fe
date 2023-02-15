import React, { useEffect, useState } from "react";
import { customFetch, handleServerError } from "../../utils/helpers";
import { useAuthDispatch, useAuth } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import NavBarAdmin from "../../components/NavBarAdmin";
import NavBarTemporal from "../../components/NavBarTemporal";

const GetPets = () => {
  const [pets, setPets] = useState([]);
  const dispatch = useAuthDispatch();
  const auth = useAuth();

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
        setPets(body);
        console.log(body);
      })
      .catch((er) => {
        console.log(er);
        toast.error("Ocurrió un error");
      });
  };

  useEffect(() => {
    getPet();
  }, []);

  return (
    <div>
      <NavBarTemporal/>
      <Container>
        <NavBarAdmin/>
        
        <h1 className="mt-5 d-flex justify-content-center "> Mascotas</h1>
        <Table striped bordered hover className="mt-5 text-center">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.type}</td>
                <td>{pet.name}</td>
                <td>{pet.age} años</td>
                <td>{pet.weight}kg.</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GetPets;
