import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import BlogService from "../../services/BlogService";
import CategoryService from "../../services/CategoryService";
import "./index.css";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const [blogs, setBlogs] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const getBlogsByCategoryId = async () => {
      try {
        setLoading(true);

        const categoriesRes = await CategoryService.getCategories();
        const filterBlogs = await BlogService.getBlogsByCategoryId(
          categoryId || null
        );

        setBlogs(filterBlogs);
        setCategories(categoriesRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBlogsByCategoryId();
  }, [categoryId]);

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }

    return categories.map((category) => {
      return categoryId === category.id ? (
        <Link
          className="link"
          key={category.id}
          style={{ color: "blue" }}
          to={"/blogs/" + category.id}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          className="link"
          key={category.id}
          style={{ color: "black" }}
          to={"/blogs/" + category.id}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
