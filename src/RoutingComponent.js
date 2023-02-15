import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth, useAuthDispatch } from "./context/AuthContextProvider";
import ClientHome from "./views/Client/ClientHome";
import Pet from "./views/Client/Pet";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import GetPets from "./views/Admin/GetPets";
import GetAdmins from "./views/Admin/GetAdmins";
import ProductHistory from "./views/Client/ProductHistory";
import Main from "./Main";

const RoutingComponent = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [routes, setRoutes] = useState("login");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    let foundUser = "";
    if (loggedInUser) {
      foundUser = JSON.parse(loggedInUser);
    }
    dispatch.setLogin(foundUser, token);
  }, []);

  useEffect(() => {
    setRoutes(routesFunction());
  }, [auth.currentUser]);

  const routesFunction = () => {
    switch (auth.currentUser?.assigned_role) {
      case "Administrador": {
        return <Routes></Routes>;
      }
      case "Cliente": {
        return <Routes></Routes>;
      }
      default: {
        return (
          <Routes>
            <Route path="/Main" element={<Main />} />
            <Route path="/clientMain" element={<ClientHome />} />
            <Route path="/" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />;
            <Route path="/cargarMascota" element={<Pet />} />
            <Route path="/mascotas" element={<GetPets />} />
            <Route path="/vendedores" element={<GetAdmins />} />
            <Route path="/historial" element={<ProductHistory />} />
          </Routes>
        );
      }
    }
  };
  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default RoutingComponent;
