import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BlogGrid from "../../components/BlogGrid";
import CategoriesList from "../../components/CategoryList";
import Footer from "../../components/Footer";

import BlogService from "../../services/BlogService";
import CategoryService from "../../services/CategoryService";

export default function HomePage() {
  const [blogs, setBlogs] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderPage = async () => {
      try {
        const blogsRes = await BlogService.getBlogs();
        const categoriesRes = await CategoryService.getCategories();

        setBlogs(blogsRes);
        setCategories(categoriesRes);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    renderPage();
  }, []);

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
      <Heading />
      <div className="container">
        <SubHeading subHeading={"Recent blog posts"} />
        <BlogGrid blogPosts={blogs} />
        <CategoriesList categories={categories} />
        <Footer />
      </div>
    </>
  );
}
