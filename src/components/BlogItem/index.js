import React from "react";
import BlogItemText from "../BlogItemText";

export default function BlogItem ({imageOrientation, index, blogPost, setBlog}) {
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