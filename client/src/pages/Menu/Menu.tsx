import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AuthenticationButton from "../Login/AuthenticationButton";

function Menu() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container style={{ fontSize: "18px" }}>
          <Navbar.Brand as={Link} to="/">
            Traqueur
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link" to="/">
                Entrainement
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </Nav>
            <AuthenticationButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Menu;
