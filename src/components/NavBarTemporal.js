import { Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBarTemporal = () => {
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm ">
    <Container className="me-auto">
      <Nav >
        <div className="d-flex justify-content-center">

        <div className="d-flex align-items-center display-10">
        <Nav.Link to="/mascotas" as={NavLink}>
          Administrador
        </Nav.Link>
        <Nav.Link to="/clientMain" as={NavLink}>
          Cliente
        </Nav.Link>
        </div>
        </div>
      </Nav>
    </Container>
  </NavbarBS>
  )
}

export default NavBarTemporal