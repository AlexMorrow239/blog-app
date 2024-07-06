import React from "react";
import PropTypes from "prop-types";

import Categories from "../Categories";
import "./index.css";

export default function BlogItemText({
  blogPost,
  headerFontSize,
  blogPostLength,
}) {
  return (
    <div className="h-auto">
      <div style={{ display: "flex" }}>
        <p className="date-author-text mb-1">
          {blogPost.author.firstName} {blogPost.author.lastName}
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text mb-1">
          {blogPost.createdAt.substring(0, 10)}
        </p>
      </div>
      <p
        className="mb-1"
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blogPost.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blogPost.description.substring(0, blogPostLength || 150)}
        {blogPost.description.length < 100 ? "" : " ..."}
      </p>
      <Categories blogPost={blogPost?.categories} />
    </div>
  );
}
BlogItemText.propTypes = {
  blogPost: PropTypes.object.isRequired,
  headerFontSize: PropTypes.string.isRequired,
  postLength: PropTypes.number,
};
