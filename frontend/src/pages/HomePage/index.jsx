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

  useEffect(() => {
    const renderPage = async () => {
      try {
        const blogsRes = await BlogService.getBlogs();
        const categoriesRes = await CategoryService.getCategories();

        setBlogs(blogsRes);
        setCategories(categoriesRes);
      } catch (err) {
        console.log(err);
      }
    };
    renderPage();
  }, []);

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
