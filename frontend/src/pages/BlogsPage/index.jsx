import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import "./index.css";

const data = require("../../dummy-data.json");
const blogsDummyData = data.blogPosts;
const categoriesDummyData = data.categories;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(blogsDummyData);
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    if (categoryId) {
      const filterBlogs = blogsDummyData.filter((blog) => {
        return blog.categories.some((category) => category.id === categoryId);
      });
      setBlogs(filterBlogs);
    }
  }, [categoryId]);

  const CategoriesList = ({ categoryId }) => {
    return categoriesDummyData.map((category) => {
      return categoryId === category.id ? (
        <button
          key={category.id}
          onClick={() => setCategoryId(category.id)}
          style={{ color: "blue" }}
        >
          <p key={category.id}>{category.title}</p>
        </button>
      ) : (
        <button
          key={category.id}
          onClick={() => setCategoryId(category.id)}
          style={{ color: "black" }}
        >
          <p key={category.id}>{category.title}</p>
        </button>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList categoryId={categoryId} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogs={blogs} />
      </div>

      <Footer />
    </>
  );
}
