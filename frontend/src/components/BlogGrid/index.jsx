import React from "react";
import PropType from "prop-types";

import BlogItem from "../BlogItem";

import "./index.css";

export default function BlogGrid({ blogPosts }) {
  if (!blogPosts || !blogPosts.length) {
    return null;
  }

  const blogPostLength = [200, 75, 75, 500];
  return (
    <>
      <div className="blog-grid-container py-2">
        <div className="item-1">
          {blogPosts.length > 0 && (
            <BlogItem
              imageOrientation={"top"}
              index={0}
              blog={blogPosts[0]}
              blogPostLength={blogPostLength[0]}
            />
          )}
        </div>

        <div className="right-block">
          {blogPosts.length > 1 && (
            <div className="item-2 h-50">
              <BlogItem
                index={1}
                blog={blogPosts[1]}
                blogPostLength={blogPostLength[1]}
              />
            </div>
          )}

          {blogPosts.length > 2 && (
            <div className="item-3 h-50">
              <BlogItem
                index={2}
                blog={blogPosts[2]}
                blogPostLength={blogPostLength[2]}
              />
            </div>
          )}
        </div>
      </div>
      {blogPosts.length > 3 && (
        <div className="item-4">
          <BlogItem
            index={3}
            blog={blogPosts[3]}
            blogPostLength={blogPostLength[3]}
          />
        </div>
      )}
    </>
  );
}

BlogGrid.prototype = {
  blogPost: PropType.array.isRequired,
};
