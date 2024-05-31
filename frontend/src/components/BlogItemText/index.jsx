import React from "react";
import PropTypes from "prop-types";

import Categories from "../Categories";
import "./index.css";

export default function BlogItemText({ blogPost, headerFontSize }) {
  console.log(blogPost);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p className="date-author-text">
          {blogPost.author.firstName} {blogPost.author.lastName}
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text">
          {blogPost.createdAt.substring(0, 10)}
        </p>
      </div>
      <p
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blogPost.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blogPost.description.substring(0, 100)}...
      </p>
      <Categories blogPost={blogPost?.categories} />
    </div>
  );
}
BlogItemText.propTypes = {
  blogPost: PropTypes.object.isRequired,
  headerFontSize: PropTypes.string.isRequired,
};
