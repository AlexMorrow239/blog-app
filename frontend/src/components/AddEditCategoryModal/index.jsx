import React, { useEffect, useRef, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

import {
  createCategory,
  updateCategory,
  setModifyCategory,
  resetCategoryModifiers,
} from "../../features/categoriesSlice";

export default function AddEditCategoryModal() {
  const dispatch = useDispatch();

  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [validation, setValidation] = useState({
    title: { isValid: true, message: "" },
    description: { isValid: true, message: "" },
    color: { isValid: true, message: "" },
  });

  const formRef = useRef(null);
  const colorRef = useRef(null);

  const addCategory = useSelector((state) => state.categories.addCategory);
  const editCategory = useSelector((state) => state.categories.editCategory);
  const modifyCategory = useSelector(
    (state) => state.categories.modifyCategory
  );

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
  }, []);

  useEffect(() => {
    if (addCategory) {
      dispatch(setModifyCategory({ ...addCategory, color: hsvaToHex(hsva) }));
      modalInstance.current?.show();
    } else if (editCategory) {
      dispatch(setModifyCategory(editCategory));
      modalInstance.current?.show();
    }
  }, [dispatch, addCategory, editCategory]);

  useEffect(() => {
    if (modifyCategory) {
      validateForm();
    }
  }, [modifyCategory]);

  const validateForm = () => {
    const newValidation = { ...validation };
    let isValid = true;

    if (!modifyCategory?.title.trim()) {
      newValidation.title = { isValid: false, message: "Title is required" };
      isValid = false;
    } else {
      newValidation.title = { isValid: true, message: "Looks good!" };
    }

    if (!modifyCategory?.description.trim()) {
      newValidation.description = {
        isValid: false,
        message: "Description is required",
      };
      isValid = false;
    } else {
      newValidation.description = { isValid: true, message: "Looks good!" };
    }

    if (!modifyCategory?.color.trim()) {
      newValidation.color = {
        isValid: false,
        message: "Enter a hex number or select color using the color wheel",
      };
      if (
        colorRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        colorRef.current.classList.replace("is-valid", "is-invalid");
      }
      isValid = false;
    } else if (!/^#[0-9A-F]{6}$/i.test(modifyCategory?.color)) {
      newValidation.color = {
        isValid: false,
        message: "Enter a valid hex number",
      };
      if (
        colorRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        colorRef.current.classList.remove("is-valid");
        colorRef.current.classList.add("is-invalid");
      }
      isValid = false;
    } else {
      newValidation.color = { isValid: true, message: "Looks good!" };
      if (
        colorRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        colorRef.current.classList.replace("is-invalid", "is-valid");
      }
    }

    setValidation(newValidation);
    return isValid;
  };

  const resetValidation = () => {
    formRef.current.classList.remove("was-validated");
    colorRef.current.classList.remove("is-invalid", "is-valid");
    setValidation({
      title: { isValid: true, message: "" },
      description: { isValid: true, message: "" },
      color: { isValid: true, message: "" },
    });
  };
  const onSubmit = (e) => {
    e?.preventDefault();
    formRef.current.classList.add("was-validated");
    if (validateForm()) {
      if (addCategory) {
        dispatch(createCategory(modifyCategory));
      } else if (editCategory) {
        dispatch(updateCategory(modifyCategory));
      }
      dispatch(resetCategoryModifiers());
      formRef.current.classList.remove("was-validated");
      resetValidation();
      modalInstance.current?.hide();
    }
  };

  const onCloseModal = (e) => {
    e.preventDefault();
    resetValidation();
    dispatch(resetCategoryModifiers());
    modalInstance.current?.hide();
  };

  return (
    <div
      className="modal fade"
      id="addEditCategoryModal"
      aria-labelledby="addEditCategoryModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditCategoryModalLabel">
              {(addCategory && "Add Category") || "Edit Category"}
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
            <form id="categoryForm" ref={formRef}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={modifyCategory?.title || ""}
                  onChange={(e) => {
                    dispatch(
                      setModifyCategory({
                        ...modifyCategory,
                        title: e.target.value,
                      })
                    );
                  }}
                  required
                />
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
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={modifyCategory?.description || ""}
                  onChange={(e) => {
                    dispatch(
                      setModifyCategory({
                        ...modifyCategory,
                        description: e.target.value,
                      })
                    );
                  }}
                  required
                />
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
              <div className="mb-3">
                <label className="form-label">Color</label>
                <div className="d-flex justify-content-evenly align-items-center flex-column flex-sm-row">
                  <Wheel
                    color={hsva}
                    onChange={(color) => {
                      dispatch(
                        setModifyCategory({
                          ...modifyCategory,
                          color: hsvaToHex(color.hsva),
                        })
                      );
                      setHsva(color.hsva);
                    }}
                  />
                  <div
                    className="my-3 my-sm-0"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: hsvaToHex(hsva),
                    }}
                  ></div>
                </div>
              </div>
              <label htmlFor="colorInput" className="form-label">
                Color: Hexadecimal
              </label>
              <input
                type="text"
                className="form-control"
                id="colorInput"
                value={modifyCategory?.color || ""}
                ref={colorRef}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setModifyCategory({
                      ...modifyCategory,
                      color: e.target.value,
                    })
                  );
                }}
                required
              ></input>
              <div
                className={
                  validation.color.isValid
                    ? "valid-feedback"
                    : "invalid-feedback"
                }
              >
                {validation.color.message}
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
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
