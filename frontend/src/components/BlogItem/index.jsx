import React from "react";

import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import PropTypes from "prop-types";

import "./index.css";
import Categories from "../Categories";

export default function BlogItem({
  index,
  blog,
  imageOrientation,
  onBlogEdit,
  onBlogDelete,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const navigateToBlog = () => {
    navigate(`/blog/${blog.id}`);
  };

  const EditButtonsContainer = () => {
    return (
      <EditButtons
        onEdit={(e) => {
          e.stopPropagation();
          onBlogEdit(blog);
        }}
        onDelete={(e) => {
          e.stopPropagation();
          onBlogDelete(blog);
        }}
        onNavigate={(e) => {
          e.stopPropagation();
          navigate(`/blog/${blog.id}`);
        }}
      />
    );
  };
  if (imageOrientation === "top") {
    return (
      <div key={index} className="card-1" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText blogPost={blog} headerFontSize="20px" />
          <Categories categories={blog.categories} removeCategory={null} />
          {user &&
          user.token &&
          blog.author.id === user._id &&
          onBlogEdit &&
          onBlogDelete ? (
            <EditButtonsContainer />
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="card-2" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText blogPost={blog} headerFontSize="20px" />
          <Categories categories={blog.categories} removeCategory={null} />
          {user &&
          user.token &&
          blog.author.id === user._id &&
          onBlogEdit &&
          onBlogDelete ? (
            <EditButtonsContainer />
          ) : null}
        </div>
      </div>
    );
  }
}

BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
  onBlogEdit: PropTypes.func,
  onBlogDelete: PropTypes.func,
};
