import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  resetSuccessAndError,
  reset as resetCategories,
  setAddCategory,
} from "../../features/categoriesSlice";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from "../../components/CategoriesList";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditCategoryModal from "../../components/AddEditCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isLoading = useSelector((state) => state.categories.isLoading);
  const message = useSelector((state) => state.categories.message);
  const isSuccess = useSelector((state) => state.categories.isSuccess);
  const isError = useSelector((state) => state.categories.isError);

  useEffect(() => {
    dispatch(fetchCategories());
    return () => {
      dispatch(resetCategories());
    };
  }, [dispatch]);

  const onCategoryAdd = () => {
    dispatch(
      setAddCategory({
        title: "",
        description: "",
        color: "#000000",
      })
    );
  };

  const AddButton = () => {
    if (!user?.token) return null;
    return (
      <button className="btn btn-outline-dark m-3" onClick={onCategoryAdd}>
        ADD CATEGORY
      </button>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
          <AddButton />
        </div>
        <CategoryList />
      </div>
      <Footer />
      <AddEditCategoryModal />
      <DeleteCategoryModal />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
    </>
  );
}
