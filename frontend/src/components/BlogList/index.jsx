import React from "react";
import BlogItem from "../../components/BlogItem";
import PropTypes from "prop-types";

export default function BlogList({ blogs, setEditBlog, setDeleteBlog }) {
  if (!blogs && blogs?.length) {
    return null;
  }

  return (
    <div className="d-flex w-100">
      {blogs.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            index={index}
            blogPost={blog}
            setBlog={() => {}}
            imageOrientation={"top"}
            setEditBlog={setEditBlog}
            setDeleteBlog={setDeleteBlog}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
  setEditBlog: PropTypes.func.isRequired,
  setDeleteBlog: PropTypes.func.isRequired,
};
