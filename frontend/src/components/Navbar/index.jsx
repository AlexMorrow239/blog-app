import React from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg">
      <div style={{ margin: "0px 5%" }} className="container-fluid">
        <a className="navbar-brand" href="#">
          iX Software Engineering Blog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/categories"
              >
                Categories
              </Link>
            </li>
            {user && user.token ? (
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className=" dropdown-item"
                        aria-current="page"
                        to={"/profile/" + user.id}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem("user");
                          navigate("/login");
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
