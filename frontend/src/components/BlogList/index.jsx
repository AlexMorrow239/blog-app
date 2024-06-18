import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import BlogItem from "../BlogItem";

import "./index.css";

import { setEditBlog, setDeleteBlog } from "../../features/blogsSlice";

export default function BlogList({ blogs }) {
  const dispatch = useDispatch();

  if (!blogs && !blogs?.length) {
    return null;
  }

  const onBlogEdit = (blog) => {
    dispatch(setEditBlog(blog));
  };

  const onBlogDelete = (blog) => {
    dispatch(setDeleteBlog(blog));
  };

  return (
    <div className="blog-list">
      {blogs.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            index={index}
            blog={blog}
            imageOrientation={"top"}
            onBlogEdit={() => onBlogEdit(blog)}
            onBlogDelete={() => onBlogDelete(blog)}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
};
