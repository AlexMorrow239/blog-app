import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
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
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/categories"
              >
                Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
