import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import EditProfileModal from "../../components/EditProfileModal";

import { resetSuccessAndError as resetAuth } from "../../features/authSlice";
import {
  fetchAuthor,
  fetchBlogsByAuthorId,
  setEditAuthor,
  resetSuccessAndError as resetAuthor,
} from "../../features/authorSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { authorId } = useParams();

  const {
    user,
    isError: isAuthError,
    isSuccess: isAuthSuccess,
    isLoading: isLoadingAuth,
    message: authMessage,
  } = useSelector((state) => state.auth);

  const {
    author,
    authorBlogs,
    isError: isAuthorError,
    isSuccess: isAuthorSuccess,
    isLoading: isLoadingAuthor,
    message: authorMessage,
  } = useSelector((state) => state.author);

  const onEditProfile = () => {
    dispatch(setEditAuthor(author));
  };

  useEffect(() => {
    dispatch(fetchBlogsByAuthorId(authorId));
    dispatch(fetchAuthor(authorId));
    return () => {
      dispatch(resetAuthor());
      dispatch(resetAuth());
    };
  }, [dispatch, authorId]);

  const resetSuccessAndErrorBoth = () => {
    if (isAuthSuccess) {
      dispatch(resetAuth());
    } else if (isAuthorSuccess) {
      dispatch(resetAuthor());
    }
  };

  const AuthorDetails = () => {
    return (
      <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
        <div className="position-sticky my-5" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">
              {author.firstName} {author.lastName}
            </h4>
            <img src={author.image} className="avatar" alt="..." />
            <p>{author.bio.substring(0, 100)}...</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoadingAuth || isLoadingAuthor || !author || !authorBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AuthorDetails />
        <div className="text-center">
          {authorId === user._id && (
            <button
              className="btn btn-outline-dark m-3 btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
              onClick={onEditProfile}
            >
              Edit Profile
            </button>
          )}
        </div>
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList blogs={authorBlogs} />
        <Footer />
      </div>
      <AddEditBlogModal />
      <DeleteBlogModal />
      <EditProfileModal />
      <SuccessToast
        show={isAuthSuccess || isAuthorSuccess}
        message={authMessage || authorMessage}
        onClose={resetSuccessAndErrorBoth}
      />
      <ErrorToast
        show={isAuthError || isAuthorError}
        message={authMessage || authorMessage}
        onClose={resetSuccessAndErrorBoth}
      />
    </>
  );
}
