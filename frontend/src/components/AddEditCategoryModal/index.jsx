import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";

import {
  createCategory,
  updateCategory,
  setModifyCategory,
  resetCategoryModifiers,
} from "../../features/categoriesSlice";

export default function AddEditCategoryModal() {
  const dispatch = useDispatch();

  const addCategory = useSelector((state) => state.categories.addCategory);
  const editCategory = useSelector((state) => state.categories.editCategory);
  const modifyCategory = useSelector(
    (state) => state.categories.modifyCategory
  );

  const modalEl = document.getElementById("addEditCategoryModal");
  const addEditCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (addCategory) {
      dispatch(setModifyCategory(addCategory));
      addEditCategoryModal?.show();
    } else if (editCategory) {
      dispatch(setModifyCategory(editCategory));
      addEditCategoryModal?.show();
    }
  }, [addCategory, editCategory, addEditCategoryModal]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) {
      if (addCategory) {
        dispatch(createCategory(modifyCategory));
      } else if (editCategory) {
        dispatch(updateCategory(modifyCategory));
      }
      dispatch(resetCategoryModifiers());
      addEditCategoryModal?.hide();
    }
  };

  const onCloseModal = () => {
    dispatch(resetCategoryModifiers());
    addEditCategoryModal.hide();
  };

  const isFormValid = () => {
    const form = document.getElementById("categoryForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  return (
    <div
      className="modal fade"
      id="addEditCategoryModal"
      aria-labelledby="addEditCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditCategoryModalLabel">
              {(addCategory && "Add Category") || "Edit Category"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form id="categoryForm">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={modifyCategory?.title}
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
                  value={modifyCategory?.description}
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
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color Hexadecimal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={modifyCategory?.color}
                  onChange={(e) => {
                    dispatch(
                      setModifyCategory({
                        ...modifyCategory,
                        color: e.target.value,
                      })
                    );
                  }}
                  required
                ></input>
                <div className="valid-feedback">Looks good!</div>
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
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
