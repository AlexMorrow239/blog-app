import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./index.css";

import EditButtons from "../EditButtons";

export default function CategoriesList({ categories, onEdit, onDelete }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!categories && !categories?.length) {
    return null;
  }

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <button
            key={category.id}
            className="card"
            style={{ borderRadius: "0px", border: "none", padding: 0 }}
            onClick={() => {
              if ((!user && !user?.token) || (!onEdit && !onDelete)) {
                navigate(`/blogs/${category.id}`);
              }
            }}
          >
            <div
              className="card-body w-100"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
              }}
            >
              <h5 className="card-title">{category.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                {category.description.substring(1, 100)} ...
              </p>
            </div>
            {user && user?.token && onEdit && onDelete && (
              <EditButtons
                onEdit={() => {
                  onEdit(category);
                }}
                onDelete={() => {
                  onDelete(category);
                }}
                onNavigate={() => {
                  navigate(`/blogs/${category.id}`);
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

CategoriesList.prototype = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
