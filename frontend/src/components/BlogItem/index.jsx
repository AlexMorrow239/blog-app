import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import PropTypes from "prop-types";

import "./index.css";
import Categories from "../Categories";

import { setEditBlog, setDeleteBlog } from "../../features/blogsSlice";

export default function BlogItem({
  index,
  blog,
  imageOrientation,
  blogPostLength,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const path = window.location.pathname;

  const card1Ref = useRef(null);

  if (path === "/home" || path === "/" || path === "")
    card1Ref?.current?.classList.add("card-1-home");

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
      />
    );
  };
  if (imageOrientation === "top") {
    return (
      <div
        key={index}
        className="card-1"
        ref={card1Ref}
        onClick={navigateToBlog}
      >
        <img src={blog.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom bg-body-secondary">
          <BlogItemText
            blogPost={blog}
            headerFontSize="20px"
            blogPostLength={blogPostLength}
          />
          <Categories categories={blog.categories} removeCategory={null} />
          {user &&
            user.token &&
            blog.author.id === user._id &&
            path !== "/home" &&
            path !== "/" && <EditButtonsContainer />}
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="card-2" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-left" alt="..." />
        <div className="card-text-right bg-body-secondary">
          <BlogItemText
            blogPost={blog}
            headerFontSize="20px"
            blogPostLength={blogPostLength}
          />
          <Categories categories={blog.categories} removeCategory={null} />
          {user &&
            user.token &&
            blog.author.id === user._id &&
            path !== "/home" &&
            path !== "/" &&
            path !== "" && <EditButtonsContainer />}
        </div>
      </div>
    );
  }
}

BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
  blogPostLength: PropTypes.number,
};
