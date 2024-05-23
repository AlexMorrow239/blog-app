// Third party
import React from "react";

// Components
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from "../../components/CategoryList";
import Footer from "../../components/Footer";

// Styles
import "../../App.css";

const data = require("../../dummy-data.json");
const categories = data.categories;

export default function CategoriesPage() {
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
