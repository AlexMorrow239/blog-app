import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import SubHeading from "../../components/Subheading";
import BlogGrid from "../../components/BlogGrid";
import CategoriesList from "../../components/CategoriesList";
import Footer from "../../components/Footer";
import Loader from "../../components/Loading";

import { fetchBlogs, reset as resetBlogs } from "../../features/blogsSlice";
import {
  fetchCategories,
  reset as resetCategories,
} from "../../features/categoriesSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { blogs, isLoading: isLoadingBlogs } = useSelector(
    (state) => state.blogs
  );

  const { categories, isLoading: isLoadingCategories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlogs());
      dispatch(resetCategories());
    };
  }, [dispatch]);

  if (isLoadingCategories || isLoadingBlogs) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <SubHeading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
        <SubHeading subHeading={"Categories"} />
        <CategoriesList categories={categories}></CategoriesList>
      </div>
      <Footer />
    </>
  );
}
