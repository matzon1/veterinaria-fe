import React, { useEffect, useState } from "react";
import { customFetch, handleServerError } from "../../utils/helpers";
import { useAuthDispatch, useAuth } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import NavBarAdmin from "../../components/NavBarAdmin";
import NavBarTemporal from "../../components/NavBarTemporal";



const GetAdmins = () => {

    const [admin, setAdmin] = useState([]);
  const dispatch = useAuthDispatch();
  const auth = useAuth();

  const getAdmin = () => {
    customFetch("GET", "api/admin", auth.token)
      .then((response) => {
        const error = handleServerError(dispatch, response);
        if (error) {
          return;
        }
        return response.json();
      })
      .then((body) => {
        setAdmin(body);
        console.log(body);
      })
      .catch((er) => {
        console.log(er);
        toast.error("Ocurrió un error");
      });
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div>
      <NavBarTemporal/>
    <Container>
        <NavBarAdmin/>
        
        <h1 className="mt-5 d-flex justify-content-center "> Vendedores</h1>
        <Table striped bordered hover className="mt-5 text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Mail</th>
            </tr>
          </thead>
          <tbody>
             {admin.map((adm) => (
              <tr key={adm.id}>
                <td>{adm.firstName}</td>
                <td>{adm.lastName}</td>
                <td>{adm.normalizedEmail.toLowerCase() }</td>
              </tr>
            ))} 
          </tbody>
        </Table>
      </Container>
      </div>
  )
}

export default GetAdmins