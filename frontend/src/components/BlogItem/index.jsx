import React from "react";
import BlogItemText from "../BlogItemText";
import PropTypes from "prop-types";
import "./index.css";

export default function BlogItem({
  imageOrientation,
  index,
  blogPost,
  setBlog,
}) {
  if (imageOrientation === "top") {
    return (
      <div
        key={index}
        className="card-1"
        onClick={() => console.log("TODO: nav to blog")}
      >
        <img src={blogPost.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={index}
        className="card-2"
        onClick={() => console.log("TODO: nav to blog")}
      >
        <img src={blogPost.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
        </div>
      </div>
    );
  }
}

BlogItem.prototype = {
  imageOrientation: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  blogPost: PropTypes.object.isRequired,
  setBlog: PropTypes.func.isRequired,
};
