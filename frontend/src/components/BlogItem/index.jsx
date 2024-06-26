import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import PropTypes from "prop-types";

import "./index.css";
import Categories from "../Categories";

import { setEditBlog, setDeleteBlog } from "../../features/blogsSlice";

export default function BlogItem({ index, blog, imageOrientation }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const path = window.location.pathname;
  console.log("path", path);

  const navigateToBlog = () => {
    navigate(`/blog/${blog.id}`);
  };

  const onBlogEdit = (blog) => {
    dispatch(setEditBlog(blog));
  };

  const onBlogDelete = (blog) => {
    dispatch(setDeleteBlog(blog));
  };

  const EditButtonsContainer = () => {
    return (
      <EditButtons
        onEdit={(e) => {
          onBlogEdit(blog);
        }}
        onDelete={(e) => {
          onBlogDelete(blog);
        }}
        onNavigate={(e) => {
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
          path !== "/home" ? (
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
          path !== "/home" ? (
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
