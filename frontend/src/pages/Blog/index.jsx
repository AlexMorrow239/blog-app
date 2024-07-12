import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";
import AuthorDetails from "../../components/AuthorDetails";

import "./index.css";

import {
  fetchBlogById,
  reset as resetBlog,
  resetSuccessAndError,
} from "../../features/blogsSlice";
import { setAuthor } from "../../features/authorSlice";

export default function BlogPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const { blog, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogById(blogId));
    return () => {
      dispatch(resetBlog());
      dispatch(setAuthor(null));
    };
  }, [blogId, dispatch]);

  useEffect(() => {
    if (blog) {
      dispatch(setAuthor(blog.author));
    }
  }, [blog, dispatch]);

  const navigateToAuthorProfile = () => {
    navigate("/profile/" + blog.author.id);
  };

  if (isLoading || !blog) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <img src={blog.image} className="my-3 cover-img" alt="..." />
        <div className="row g-5">
          <div className="col-md-8">
            <article className="blog-post">
              <div className="my-5">
                <h2 className="blog-post-title">{blog.title}</h2>
                <p className="blog-post-meta">
                  {blog.updatedAt.slice(0, 10)} by{" "}
                  <Link to={"/profile/" + blog.author.id}>
                    {blog.author.firstName} {blog.author?.lastName}
                  </Link>
                </p>
                <p>{blog.description}</p>
                <Categories
                  categories={blog.categories}
                  removeCategory={null}
                />
              </div>
              <hr />
              {blog.content.map((content, index) => {
                return (
                  <div key={index} className="my-5">
                    <h2 className="my-3">{content.sectionHeader}</h2>
                    <p>{content.sectionText}</p>
                  </div>
                );
              })}
            </article>
          </div>
          <div className="author col-md-4" onClick={navigateToAuthorProfile}>
            <div className="position-sticky my-5" style={{ top: "2rem" }}>
              <AuthorDetails author={blog.author} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccessAndError}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetSuccessAndError}
      />
    </>
  );
}
