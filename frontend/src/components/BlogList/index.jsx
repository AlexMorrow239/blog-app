import React from "react";
import PropTypes from "prop-types";

import BlogItem from "../BlogItem";

import "./index.css";

export default function BlogList({ blogPosts, onBlogEdit, onBlogDelete }) {
  if (!blogPosts && !blogPosts?.length) {
    return null;
  }

  // TODO: Styling
  return (
    <div className="blog-list">
      {blogPosts.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            index={index}
            blog={blog}
            imageOrientation={"top"}
            onBlogEdit={onBlogEdit}
            onBlogDelete={onBlogDelete}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogPosts: PropTypes.array.isRequired,
};
