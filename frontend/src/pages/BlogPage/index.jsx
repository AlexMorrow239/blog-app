import React from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import "../../App.css";

import PropTypes from "prop-types";

const data = require("../../dummy-data.json");
const blogPosts = data.blogPosts;

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <BlogList blogs={blogPosts} />
      </div>
      <Footer />
    </>
  );
}

BlogPage.prototype = {
  blogs: PropTypes.array.isRequired,
};
