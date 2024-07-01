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

  const user = JSON.parse(localStorage.getItem("user"));

  const { addBlog, editBlog } = useSelector((state) => state.blogs);
  const { categories } = useSelector((state) => state.categories);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });
  const [blogImage, setBlogImage] = useState("");

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const blogForm = buildFormData();

      if (addBlog) {
        dispatch(createBlog(blogForm));
      } else if (editBlog) {
        dispatch(updateBlog(blogForm));
      }
      resetBlog();
      modalInstance.current?.hide();
    }
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

  const isFormValid = () => {
    const form = document.getElementById("blogForm");
    form.classList.add("was-validated");
    return form.checkValidity();
  };

  const onCloseModal = (e) => {
    e.preventDefault();
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
                onClick={onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form id="blogForm">
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
                    onChange={(e) => {
                      setBlog({ ...blog, title: e.target.value });
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={blog.description}
                    onChange={(e) => {
                      setBlog({ ...blog, description: e.target.value });
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
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
                      <div className="valid-feedback">Looks good!</div>
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
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                ))}
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
