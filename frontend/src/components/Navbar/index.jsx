import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { setUser, resetSuccessAndError } from "../../features/authSlice";

import "./index.css";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(resetSuccessAndError());
    navigate("/home");
  };

  return (
    <div className="bg-light">
      <div className="container">
        <Navbar expand="lg">
          <Navbar.Brand as={NavLink} to="/home">
            Cape Chronicles Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blogs">
                Blogs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              {user && user.token ? (
                <NavDropdown
                  title={<i className="bi bi-person-circle"></i>}
                  id="basic-nav-dropdown"
                  style={{ maxWidth: "75px" }}
                >
                  <NavDropdown.Item as={NavLink} to={`/profile/${user._id}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
