import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../Categories";
import FormImage from "../FormImage";

import {
  createBlog,
  updateBlog,
  setAddBlog,
  setEditBlog,
} from "../../features/blogsSlice";

export default function AddEditBlogModal() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const formRef = useRef();
  const selectRef = useRef();

  const { addBlog, editBlog } = useSelector((state) => state.blogs);
  const { categories } = useSelector((state) => state.categories);

  // Local state for the blog form to control the input fields
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });
  const [blogImage, setBlogImage] = useState("");
  // Validation for input fields
  const [validation, setValidation] = useState({
    categories: { isValid: true, message: "" },
    title: { isValid: true, message: "" },
    description: { isValid: true, message: "" },
    content: { isValid: true, message: "" },
  });

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
  }, []);

  useEffect(() => {
    if (addBlog) {
      setBlog(addBlog);
      setBlogImage(addBlog?.image);
      modalInstance.current?.show();
    } else if (editBlog) {
      setBlog(editBlog);
      setBlogImage(editBlog?.image);
      modalInstance.current?.show();
    }
  }, [addBlog, editBlog]);

  useEffect(() => {
    validateForm();
  }, [blog]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("image", blog.image);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("categories", JSON.stringify(blog.categories));
    formData.append("content", JSON.stringify(blog.content));
    formData.append("authorId", user?._id);
    return formData;
  };

  const validateForm = () => {
    const newValidation = { ...validation };
    let isValid = true;

    // Check if the blog has at least one category
    if (!blog.categories || blog.categories.length === 0) {
      newValidation.categories = {
        isValid: false,
        message: "At least one category is required.",
      };
      if (
        selectRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        selectRef.current.classList.remove("is-valid");
        selectRef.current.classList.add("is-invalid");
      }
      isValid = false;
    } else {
      newValidation.categories = { isValid: true, message: "Looks good!" };
      if (
        selectRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        selectRef.current.classList.remove("is-invalid");
        selectRef.current.classList.add("is-valid");
      }
    }
    // Check if the blog has a title and description
    if (!blog.title.trim()) {
      newValidation.title = { isValid: false, message: "Title is required." };
      isValid = false;
    } else {
      newValidation.title = { isValid: true, message: "Looks good!" };
    }

    if (!blog.description.trim()) {
      newValidation.description = {
        isValid: false,
        message: "Description is required.",
      };
      isValid = false;
    } else {
      newValidation.description = { isValid: true, message: "Looks good!" };
    }
    // Check if the blog content has at least one section and each section has a header and text
    if (
      blog.content.some(
        (section) =>
          !section.sectionHeader.trim() || !section.sectionText.trim()
      )
    ) {
      newValidation.content = {
        isValid: false,
        message: "All content sections must have a header and text.",
      };
      isValid = false;
    } else if (blog.content.length === 0) {
      newValidation.content = {
        isValid: false,
        message: "At least one content section is required.",
      };
      isValid = false;
    } else {
      newValidation.content = { isValid: true, message: "Looks good!" };
    }
    setValidation(newValidation);
    return isValid;
  };

  const resetValidation = () => {
    formRef.current.classList.remove("was-validated");
    selectRef.current.classList.remove("is-invalid", "is-valid");
    setValidation({
      categories: { isValid: true, message: "" },
      title: { isValid: true, message: "" },
      description: { isValid: true, message: "" },
      content: { isValid: true, message: "" },
    });
  };

  const onImageChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setBlogImage(URL.createObjectURL(file));
      setBlog((prevBlog) => ({ ...prevBlog, image: file }));
    }
  };

  const resetBlog = () => {
    dispatch(setEditBlog(null));
    dispatch(setAddBlog(null));

    setBlog({
      title: "",
      description: "",
      categories: [],
      content: [],
      authorId: "",
    });
  };

  // These functions handle exiting the modal
  const onSubmit = (e) => {
    e.preventDefault();
    formRef.current.classList.add("was-validated");
    if (validateForm()) {
      const blogForm = buildFormData();
      if (addBlog) {
        dispatch(createBlog(blogForm));
      } else if (editBlog) {
        dispatch(updateBlog(blogForm));
      }
      resetBlog();
      formRef.current.classList.remove("was-validated");
      resetValidation();
      modalInstance.current?.hide();
    }
  };
  const onCloseModal = (e) => {
    e.preventDefault();
    resetValidation();
    resetBlog();
    modalInstance.current?.hide();
  };

  if (!categories || !categories.length) {
    return null;
  }

  return (
    <div>
      <div
        className="modal fade"
        id="addEditModal"
        tabIndex="-1"
        aria-labelledby="addEditModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addEditModalLabel">
                {addBlog ? "Add Blog" : "Edit Blog"}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
                onClick={onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form id="blogForm" ref={formRef}>
                <div>
                  <FormImage image={blogImage} onChange={onImageChange} />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="categoryInputSelect"
                  >
                    Categories
                  </label>
                  <select
                    className="form-select"
                    id="categoryInputSelect"
                    ref={selectRef}
                    onChange={(e) => {
                      const category = categories.find(
                        (x) => x.id === e.target.value
                      );
                      if (
                        category &&
                        !blog.categories.find((x) => x.id === category.id)
                      ) {
                        setBlog((prevBlog) => ({
                          ...prevBlog,
                          categories: [...prevBlog.categories, category],
                        }));
                      }
                    }}
                    required={!editBlog}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <div
                    className={
                      validation.categories.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.categories.message}
                  </div>
                </div>
                <div className="mb-3">
                  <Categories
                    categories={blog.categories}
                    removeCategory={(category) => {
                      setBlog((prevBlog) => ({
                        ...prevBlog,
                        categories: prevBlog.categories.filter(
                          (x) => x.id !== category.id
                        ),
                      }));
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={blog.title}
                    maxLength={50}
                    onChange={(e) => {
                      setBlog({ ...blog, title: e.target.value });
                    }}
                    required
                  />
                  <div
                    style={{
                      position: "relative",
                      bottom: "1px",
                      left: "10px",
                      fontSize: "12px",
                      color: "#6c757d",
                    }}
                  >
                    {blog.title.length}/50
                  </div>
                  <div
                    className={
                      validation.title.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.title.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    value={blog.description}
                    maxLength={300}
                    onChange={(e) => {
                      setBlog({ ...blog, description: e.target.value });
                    }}
                    required
                  />
                  <div
                    style={{
                      position: "relative",
                      bottom: "1px",
                      left: "10px",
                      fontSize: "12px",
                      color: "#6c757d",
                    }}
                  >
                    {blog.description.length}/300
                  </div>
                  <div
                    className={
                      validation.description.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.description.message}
                  </div>
                </div>
                <label htmlFor="description" className="form-label">
                  Content
                </label>
                {blog.content.map((section, index) => (
                  <div className="p-3" key={index}>
                    <div className="mb-3">
                      <label
                        htmlFor={"sectionHeader" + index}
                        className="form-label"
                      >
                        Section Header
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={"sectionHeader" + index}
                        value={section.sectionHeader}
                        maxLength={50}
                        onChange={(e) => {
                          const updatedContent = blog.content.map(
                            (sec, secIndex) =>
                              secIndex === index
                                ? { ...sec, sectionHeader: e.target.value }
                                : sec
                          );
                          setBlog({ ...blog, content: updatedContent });
                        }}
                        required
                      />
                      <div
                        style={{
                          position: "relative",
                          bottom: "1px",
                          left: "10px",
                          fontSize: "12px",
                          color: "#6c757d",
                        }}
                      >
                        {blog.content[index].sectionHeader.length}/50
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={"sectionText" + index}
                        className="form-label"
                      >
                        Section Text
                      </label>
                      <textarea
                        className="form-control"
                        id={"sectionText" + index}
                        value={section.sectionText}
                        maxLength={2000}
                        onChange={(e) => {
                          const updatedContent = blog.content.map(
                            (sec, secIndex) =>
                              secIndex === index
                                ? { ...sec, sectionText: e.target.value }
                                : sec
                          );
                          setBlog({ ...blog, content: updatedContent });
                        }}
                        required
                      />
                      <div
                        style={{
                          position: "relative",
                          bottom: "1px",
                          left: "10px",
                          fontSize: "12px",
                          color: "#6c757d",
                        }}
                      >
                        {blog.content[index].sectionText.length}/2000
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className={
                    validation.content.isValid
                      ? "valid-feedback mb-3"
                      : "invalid-feedback mb-3"
                  }
                >
                  {validation.content.message}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {blog.content.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{
                        position: "absolute",
                        bottom: "45px",
                        right: "10px",
                        zIndex: "1",
                      }}
                      onClick={() => {
                        setBlog((prevBlog) => ({
                          ...prevBlog,
                          content: prevBlog.content.slice(0, -1),
                        }));
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      setBlog((prevBlog) => ({
                        ...prevBlog,
                        content: [
                          ...prevBlog.content,
                          { sectionHeader: "", sectionText: "" },
                        ],
                      }));
                    }}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={onSubmit}
              >
                {addBlog ? "Add" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//path: frontend/src/components/AddEditBlogModal/index.jsx
