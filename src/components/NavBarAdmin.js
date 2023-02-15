import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const NavBarAdmin = () => {
  return (
         <NavbarBS sticky="top" className="bg-white shadow-sm mb-1 navbar-cont">
      <Container className="me-auto">
        <Nav >
          <div className="d-flex justify-content-center">

          <div className="d-flex align-items-center display-10">
          <Nav.Link to="/mascotas" as={NavLink}>
            Pedidos
          </Nav.Link>
          <Nav.Link to="/mascotas" as={NavLink}>
            Historial mascotas
          </Nav.Link>
          <Nav.Link to="" as={NavLink}>
            Historial dueños
          </Nav.Link>
          <Nav.Link to="/vendedores" as={NavLink}>
            Vendedores
          </Nav.Link>
          </div>
          </div>
        </Nav>
        </Container>
        </NavbarBS>
  )
}

export default NavBarAdmin