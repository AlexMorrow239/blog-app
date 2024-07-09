import React from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

export default function Footer() {
  return (
    <div className="bg-light">
      <div className="container mt-5">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-2 mb-3">
            <li className="nav-item">
              <NavLink className="nav-link px-2 text-muted" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2 text-muted" to="/blogs">
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2 text-muted" to="/categories">
                Categories
              </NavLink>
            </li>
          </ul>
          <p className="text-center text-muted d-block mb-2">
            Created By: Alex Morrow
          </p>
          <div className="d-flex justify-content-center">
            <a
              href="https://www.linkedin.com/in/alex-morrow-umiami/"
              className="linkedin"
            >
              <i className="bi bi-linkedin item" />
            </a>
            <a href="https://github.com/AlexMorrow239" className="github">
              <i className="bi bi-github item" />
            </a>
            <a href="mailto:alex.morrow239@gmail.com" className="email">
              <i className="bi bi-envelope-fill item" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
