import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Subheading from "../../components/Subheading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AuthorDetails from "../../components/AuthorDetails";

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

  if (isLoadingAuth || isLoadingAuthor || !author || !authorBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
          <div className="my-5" style={{ top: "2rem" }}>
            <AuthorDetails onEditProfile={onEditProfile} />
          </div>
        </div>
        <Subheading subHeading={"Blogs by " + author.firstName + ":"} />
        <BlogList blogs={authorBlogs} />
      </div>
      <Footer />

      <AddEditBlogModal />
      <DeleteBlogModal />
      <EditProfileModal />
      <SuccessToast
        show={isAuthSuccess || isAuthorSuccess}
        message={authMessage || authorMessage}
        onClose={() => {
          dispatch(resetAuth());
          dispatch(resetAuthor());
        }}
      />
      <ErrorToast
        show={isAuthError || isAuthorError}
        message={authMessage || authorMessage}
        onClose={() => {
          dispatch(resetAuth());
          dispatch(resetAuthor());
        }}
      />
    </>
  );
}
