import React from "react";
import PropTypes from "prop-types";

import "./index.css";

import { useSelector } from "react-redux";

export default function Categories({ categories, removeCategory }) {
  const { addBlog, editBlog } = useSelector((state) => state.blogs);

  if (!categories && !categories?.length) return null;
  return (
    <div className="d-flex flex-wrap">
      {categories.map((category, index) => {
        return (
          <p
            key={index}
            className="category-tag"
            style={{
              color: category.color,
              backgroundColor: category.color + "33",
              width: "fit-content",
            }}
          >
            {category.title}
            {editBlog || addBlog ? (
              <i
                className="bi bi-x"
                onClick={() => {
                  removeCategory(category);
                }}
              ></i>
            ) : null}
          </p>
        );
      })}
    </div>
  );
}

Categories.prototype = {
  categories: PropTypes.array.isRequired,
};
