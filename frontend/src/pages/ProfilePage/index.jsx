import React from "react";
import { useState, useEffect, useParams } from "react";

import NavBar from "../../components/Navbar";
import AuthorDetails from "../../components/AuthorDetails";
import BlogList from "../../components/BlogList";
import Loader from "../../components/Loader";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Footer from "../../components/Footer";
import AddEditBlogModal from "../../components/AddEditBlogModal";

import BlogService from "../../services/BlogService";

export default function ProfilePage() {
  const { authorId } = useParams();

  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthorBlogs = async () => {
      try {
        setIsLoading(true);
        const authorBlogsRes = await BlogService.fetchBlogsByAuthorId(authorId);
        setAuthorBlogs(authorBlogsRes.data);
        setIsSuccess(true);
        setMessage(authorBlogsRes.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setMessage(error.message || error);
      }
    };
    getAuthorBlogs();
  }, [authorId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  };

  const resetError = () => {
    setIsError(false);
    setMessage("");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <AuthorDetails />
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList blogPosts={authorBlogs} />
        <Footer />
      </div>
      {/* <EditProfileModal /> */}
      <AddEditBlogModal />
      {/* <DeleteBlogModal /> */}
      <SuccessToast show={isSuccess} message={message} onClose={resetSuccess} />
      <ErrorToast show={isError} message={message} onClose={resetError} />
    </>
  );
}
