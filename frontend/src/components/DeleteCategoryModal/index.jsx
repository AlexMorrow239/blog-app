import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";

import {
  setModifyCategory,
  resetCategoryModifiers,
  deleteCategory,
} from "../../features/categoriesSlice";

export default function DeleteCategoryModal() {
  const dispatch = useDispatch();

  const modifyCategory = useSelector(
    (state) => state.categories.modifyCategory
  );
  const removeCategory = useSelector(
    (state) => state.categories.removeCategory
  );

  const modalEl = document.getElementById("deleteCategoryModal");
  const deleteCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (removeCategory) {
      dispatch(setModifyCategory(removeCategory));
      deleteCategoryModal?.show();
    }
  }, [dispatch, removeCategory, deleteCategoryModal]);

  const onCloseModal = () => {
    dispatch(resetCategoryModifiers());
    dispatch(resetCategoryModifiers);
    deleteCategoryModal?.hide();
  };

  const onDelete = () => {
    dispatch(deleteCategory(modifyCategory.id));
    dispatch(resetCategoryModifiers());
    deleteCategoryModal?.hide();
  };

  return (
    <div
      className="modal fade"
      id="deleteCategoryModal"
      aria-labelledby="deleteCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteCategoryModalLabel">
              Delete Category
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are You sure you want to delete this Category?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: modifyCategory?.color,
                }}
              ></span>
              <h5 style={{ marginLeft: "8px", marginBottom: "0" }}>
                {modifyCategory?.title}
              </h5>
            </div>
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
              className="btn btn-outline-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
