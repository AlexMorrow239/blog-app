import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./index.css";

import EditButtons from "../EditButtons";

import {
  setEditCategory,
  setRemoveCategory,
} from "../../features/categoriesSlice";

export default function CategoriesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const path = window.location.pathname;

  const categories = useSelector((state) => state.categories.categories);
  const addCategory = useSelector((state) => state.categories.addCategory);
  const editCategory = useSelector((state) => state.categories.editCategory);
  const removeCategory = useSelector(
    (state) => state.categories.removeCategory
  );

  const onCategoryUpdate = (category) => {
    dispatch(setEditCategory(category));
  };

  const onCategoryDelete = (category) => {
    dispatch(setRemoveCategory(category));
  };

  if (!categories && !categories?.length) {
    return null;
  }

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="card"
            style={{ borderRadius: "0px", border: "none", padding: 0 }}
            onClick={() => {
              if (
                (!user && !user?.token) ||
                (!editCategory && !addCategory && !removeCategory)
              ) {
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
                {category.description.substring(0, 100)} ...
              </p>
            </div>
            {user && user?.token && path !== "/home" && (
              <EditButtons
                onEdit={() => {
                  onCategoryUpdate(category);
                }}
                onDelete={() => {
                  onCategoryDelete(category);
                }}
                onNavigate={() => {
                  navigate(`/blogs/${category.id}`);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
