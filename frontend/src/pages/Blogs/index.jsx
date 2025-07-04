import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import AddEditBlogModal from "../../components/AddEditBlogModal";
import BlogList from "../../components/BlogList";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import ErrorToast from "../../components/ErrorToast";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import SuccessToast from "../../components/SuccessToast";

import "./index.css";

import {
  fetchBlogsByCategoryId,
  resetSuccessAndError as resetBlog,
  setAddBlog,
} from "../../features/blogsSlice";
import {
  fetchCategories,
  resetSuccessAndError as resetCategory,
  setMessage as setCategoriesMessage,
  setIsError as setIsCategoriesError,
} from "../../features/categoriesSlice";

export default function BlogsPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { categoryId } = useParams();

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
    isSuccess: isCategoriesSuccess,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const testingBlogAdd = false;
  const onBlogAdd = (catId = null) => {
    if (categories && categories.length) {
      if (testingBlogAdd) {
        dispatch(
          setAddBlog({
            title: "Dummy Title",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            categories: [],
            authorId: user._id,
            content: [
              {
                sectionHeader: "Introduction",
                sectionText:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              },
            ],
          })
        );
      } else {
        let categoryArr = [];
        if (catId) {
          categoryArr.push(
            categories.find((category) => category.id === catId)
          );
        }
        dispatch(
          setAddBlog({
            title: "",
            description: "",
            categories: categoryArr,
            authorId: user._id,
            content: [{ sectionHeader: "", sectionText: "" }],
          })
        );
      }
    } else {
      dispatch(setCategoriesMessage("Please add a category first!"));
      dispatch(setIsCategoriesError(true));
    }
  };

  const AddButton = () => {
    if (!user || !user?.token) {
      return null;
    }
    return (
      <button
        className="btn btn-outline-dark m-3"
        onClick={() => {
          onBlogAdd();
        }}
      >
        ADD BLOG
      </button>
    );
  };

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }
    return categories.map((category) => {
      const isActive = categoryId === category.id ? "active" : "";
      return (
        <Link
          className={`link ${isActive}`}
          key={category.id}
          to={"/blogs/" + category.id}
          style={{
            backgroundColor: isActive ? category.color : "none",
          }}
        >
          <span key={category.id}>{category.title}</span>
        </Link>
      );
    });
  };

  if (isLoadingBlogs || isLoadingCategories) {
    return <Loading />;
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
          <AddButton />
        </div>
        {!blogs || !blogs.length ? (
          <div className="container">
            <span className="text-muted">
              There are no blogs under this caetgory. Would you like to{" "}
              <button
                onClick={() => {
                  onBlogAdd(categoryId);
                }}
                className="link"
              >
                add one
              </button>
              ?
            </span>
          </div>
        ) : (
          <BlogList blogs={blogs} />
        )}
        <AddEditBlogModal />
        <DeleteBlogModal />
      </div>
      <Footer />
      <SuccessToast
        show={isBlogSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
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
