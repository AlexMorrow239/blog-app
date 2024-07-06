import React from "react";
import PropTypes from "prop-types";

import BlogItem from "../BlogItem";

import "./index.css";

export default function BlogList({ blogs }) {
  if (!blogs && !blogs?.length) {
    return null;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog, index) => {
        return (
          <div className="item" key={index}>
            <BlogItem
              key={index}
              index={index}
              blog={blog}
              imageOrientation={"top"}
            />
          </div>
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
};
