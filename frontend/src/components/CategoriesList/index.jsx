import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./index.css";

import EditButtons from "../EditButtons";

import { CATEGORY_DESCRIPTION_LIMIT } from "../../constants";

import {
  setEditCategory,
  setRemoveCategory,
} from "../../features/categoriesSlice";
import FullScreenButton from "../FullScreenButton";

export default function CategoriesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const path = window.location.pathname;

  const categories = useSelector((state) => state.categories.categories);

  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const toggleDescription = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null); // Collapse if it's already expanded
    } else {
      setExpandedCategoryId(categoryId); // Expand the clicked category
    }
  };

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
              navigate(`/blogs/${category.id}`);
            }}
          >
            <div
              className="card-body w-100"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
                border: "3px solid " + (category.color + "66"),
              }}
            >
              <h5 className="card-title h-auto">{category.title}</h5>
            </div>
            <div className="card-body bg-body-secondary">
              <p className="card-text">
                {expandedCategoryId === category.id
                  ? category.description
                  : `${category.description.substring(
                      0,
                      CATEGORY_DESCRIPTION_LIMIT
                    )}${
                      category.description.length > CATEGORY_DESCRIPTION_LIMIT
                        ? "..."
                        : ""
                    }`}
              </p>
            </div>
            {/* If logged in and not on the home page */}
            {user &&
            user?.token &&
            path !== "/home" &&
            path !== "/" &&
            path !== "" ? (
              <>
                <EditButtons
                  onEdit={() => {
                    onCategoryUpdate(category);
                  }}
                  onDelete={() => {
                    onCategoryDelete(category);
                  }}
                />
                <FullScreenButton
                  onFullScreen={() => {
                    toggleDescription(category.id);
                  }}
                  orientation={"left"}
                  descriptionLength={category.description.length}
                />
              </>
            ) : (
              <FullScreenButton
                onFullScreen={() => {
                  toggleDescription(category.id);
                }}
                orientation={"right"}
                descriptionLength={category.description.length}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
