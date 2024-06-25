import React from "react";
import "./index.css";

export default function Footer() {
  return (
    <div className="container mt-5">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link px-2 text-muted">
              Blogs
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link px-2 text-muted">
              Categories
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">Created By: Alex Morrow</p>
      </footer>
    </div>
  );
}
