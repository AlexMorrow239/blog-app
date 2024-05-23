import React from "react";
import BlogItem from "../BlogItem"
import "./index.css"

export default function BlogGrid({blogPosts}) {
    if (!blogPosts || !blogPosts.length) {
        return null;
    }

    return (
        <>
        <div className="blog-grid-container">
        <div className="item-1">
          {blogPosts.length > 0 && (
            <BlogItem
              imageOrientation={"top"}
              index={0}
              blogPost={blogPosts[0]}
            />
          )}
        </div>

        <div className="right-block">
          {blogPosts.length > 1 && (
            <div className="item-2">
              <BlogItem
                imageOrientation={"left"}
                index={1}
                blogPost={blogPosts[1]}
              />
            </div>
          )}

          {blogPosts.length > 2 && (
            <div className="item-3">
              <BlogItem index={2} blogPost={blogPosts[2]} />
            </div>
          )}
        </div>
      </div>
      {blogPosts.length > 3 && (
        <div className="item-4">
          <BlogItem index={3} blogPost={blogPosts[3]} />
        </div>
      )}
        </>
    )

}