import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/contextUser";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Header = (props) => {
  const { userAuth, logoutContext } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext();
    navigate("/");
    toast.success("Log Out succeed");
  };

  return (
    <Navbar
      style={{ backgroundColor: "#f2f4f6" }}
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            height="30"
            width="30"
            className="d-inline-block align-top"
            alter="dat"
          />{" "}
          Dat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            {userAuth && userAuth.isAuth && (
              <NavLink to="/users" className="nav-link">
                User
              </NavLink>
            )}
          </Nav>
          <Nav>
            {userAuth && !userAuth.isAuth ? (
              <NavLink to="login" className="nav-link">
                Login
              </NavLink>
            ) : (
              <NavDropdown
                title={userAuth ? userAuth.email : "Account"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <NavLink className="nav-link" onClick={handleLogout}>
                    Log Out
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
