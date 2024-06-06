// Third party
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

// Styles
import "../../App.css";
import "./index.css";

// State
import {
  setAddBlog,
  fetchBlogsByCategoryId,
  resetSuccessAndError as resetBlog,
} from "../../features/blogsSlice";
import {
  fetchCategories,
  resetSuccessAndError as resetCategory,
} from "../../features/categoriesSlice";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogSuccess,
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);
  const {
    categories,
    isError: isCategoriesError,
    isLoading: isLoadingCategories,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogsByCategoryId(categoryId));
    return () => {
      dispatch(resetBlog());
      dispatch(resetCategory());
    };
  }, [categoryId, dispatch]);

  const onAddBlog = () => {
    dispatch(
      setAddBlog({
        image: "",
        title: "",
        description: "",
        categories: [],
        content: [],
        authorId: user?.id,
      })
    );
  };

  const CategoriesList = () => {
    return categories.map((category, index) => {
      return categoryId === category.id.toString() ? (
        <Link
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
          className="link"
        >
          <p key={index}>{category.title}</p>
        </Link>
      ) : (
        <Link
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
          className="link"
        >
          <p key={index}>{category.title}</p>
        </Link>
      );
    });
  };

  const AddBlog = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="page-subtitle">Blog Posts</p>
        {user && (
          <button
            style={{ margin: "16px" }}
            type="button"
            className="btn btn-outline-secondary"
            onClick={onAddBlog}
          >
            Add Blog Post
          </button>
        )}
      </div>
    );
  };

  if (isLoadingCategories || isLoadingBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList />
        </div>
        <AddBlog />
        <BlogList blogPosts={blogs} />
      </div>
      <Footer />
      <AddEditBlogModal />
      <DeleteBlogModal />
      <SuccessToast
        show={isBlogSuccess}
        message={blogsMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
    </>
  );
}
