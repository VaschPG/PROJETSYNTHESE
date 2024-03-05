import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AuthenticationButton from "../pages/Login/AuthenticationButton";

function Menu() {
  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/'>Traqueur</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Link className='nav-link' to='/exercise'>
                Entrainement
              </Link>
              <Link className='nav-link' to='/profile'>
                Profile
              </Link>
              <Link className='nav-link' to='/login'>
                Login Exemple
              </Link>
              <Link className='nav-link' to='/testchart'></Link>
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
