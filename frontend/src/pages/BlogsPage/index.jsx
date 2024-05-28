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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await BlogService.getBlogs();
        const categoriesRes = await CategoryService.getCategories();
        setCategories(categoriesRes);
        setBlogs(blogsRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getBlogsByCategoryId = async () => {
      try {
        const filterBlogs = await BlogService.getBlogsByCategoryId(categoryId);
        setBlogs(filterBlogs);
      } catch (error) {
        console.log(error);
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
          to={"/blogs/" + categoryId}
          onClick={setLoading(true)}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          className="link"
          key={category.id}
          style={{ color: "black" }}
          to={"/blogs/" + categoryId}
          onClick={setLoading(true)}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  if (loading) {
    return (
      <div classname="d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
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
