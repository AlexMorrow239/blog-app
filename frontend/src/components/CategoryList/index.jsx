import React from "react";

import "./index.css";

export default function CategoryList({ categories }) {
  if (!categories) return null;
  return (
    <div className="category-list">
      {categories?.map((category, index) => {
        return (
          <div
            key={index}
            className="card"
            style={{ borderRadius: "0px", border: "none" }}
          >
            <div
              className="card-body"
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
          </div>
        );
      })}
    </div>
  );
}
