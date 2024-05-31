// Third party
import React from "react";
import { useEffect, useState } from "react";

// Components
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from "../../components/CategoryList";
import Footer from "../../components/Footer";

import CategoryService from "../../services/Category";
// Styles
import "../../App.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
        </div>
        <CategoryList categories={categories}></CategoryList>
      </div>
      <Footer />
    </>
  );
}
