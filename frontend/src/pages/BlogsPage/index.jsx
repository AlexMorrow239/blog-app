import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import Loader from "../../components/Loader";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import BlogService from "../../services/BlogService";
import CategoryService from "../../services/CategoryService";
import "./index.css";

export default function BlogsPage() {
  const [addBlog, setAddBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });
  const [editBlog, setEditBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });

  const [createBlog, setCreateBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });

  const [deleteBlog, setDeleteBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });

  const [user, setUser] = useState(null);

  const { categoryId } = useParams();

  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blogPosts = await BlogService.fetchBlogsByCategoryId(categoryId);
        setBlogPosts(blogPosts.data.reverse());
        setIsSuccess(true);
        setMessage(blogPosts.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message || error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  };

  const resetError = () => {
    setIsError(false);
    setMessage("");
  };

  const onAddBlog = () => {
    setAddBlog({
      image: "",
      title: "",
      description: "",
      categories: [],
      content: [],
      authorId: user?.id,
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

  const removeBlog = async (blog) => {
    try {
      setIsLoading(true);
      const blogRes = await BlogService.deleteBlogsById(blog.id);
      setBlogPosts(null);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }

    return categories.map((category) => {
      return categoryId === category.id ? (
        <Link
          key={category.id}
          style={{ color: "blue" }}
          to={"/blogs/" + category.id}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          key={category.id}
          style={{ color: "black" }}
          to={"/blogs/" + category.id}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  if (isLoading) {
    return <Loader />;
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
          <AddBlog />
        </div>
        <BlogList
          blogs={blogPosts}
          onEdit={setEditBlog}
          onDelete={setDeleteBlog}
        />
        <AddEditBlogModal
          addBlog={addBlog}
          editBlog={editBlog}
          categories={categories}
          createBlog={createBlog}
          updateBlog={editBlog}
        />
        <DeleteBlogModal deleteBlog={deleteBlog} removeBlog={removeBlog} />
      </div>
      <Footer />

      <SuccessToast show={isSuccess} message={message} onClose={resetSuccess} />
      <ErrorToast show={isError} message={message} onClose={resetError} />
    </>
  );
}
