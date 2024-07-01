import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  updateAuthor,
  setEditAuthor,
  setAuthorImage,
} from "../../features/authorSlice";

import FormImage from "../FormImage";

export default function EditProfileModal() {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const authorSlice = useSelector((state) => state.author);

  const modalEl = document.getElementById("editProfileModal");
  const editProfileModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (authorSlice.editAuthor) {
      editProfileModal.show();
    }
  }, [authorSlice.editAuthor, editProfileModal]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("id", authorSlice.editAuthor._id);
    formData.append("image", selectedFile);
    formData.append("firstName", authorSlice.editAuthor.firstName);
    formData.append("lastName", authorSlice.editAuthor.lastName);
    formData.append("bio", authorSlice.editAuthor.bio);
    formData.append("email", authorSlice.editAuthor.email);
    return formData;
  };

  const isFormValid = () => {
    const form = document.getElementById("authorForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) {
      const authorForm = buildFormData();
      if (authorSlice.editAuthor) {
        dispatch(updateAuthor(authorForm));
      }
    }
    editProfileModal?.hide();
  };

  const onCloseModal = (e) => {
    e?.preventDefault();
    editProfileModal?.hide();
    dispatch(setEditAuthor(null));
  };

  const onImageChange = (e) => {
    e?.preventDefault();

    if (e?.target?.files?.length) {
      const file = e.target.files[0];
      dispatch(setAuthorImage(URL.createObjectURL(file)));
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="addEditModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="addEditModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form id="authorForm">
                <div>
                  <FormImage
                    image={authorSlice.authorImage}
                    onChange={onImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={authorSlice.editAuthor?.firstName}
                    onChange={(e) => {
                      dispatch(
                        setEditAuthor({
                          ...authorSlice.editAuthor,
                          firstName: e.target.value,
                        })
                      );
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={authorSlice.editAuthor?.lastName}
                    onChange={(e) => {
                      dispatch(
                        setEditAuthor({
                          ...authorSlice.editAuthor,
                          lastName: e.target.value,
                        })
                      );
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    value={authorSlice.editAuthor?.bio}
                    onChange={(e) => {
                      dispatch(
                        setEditAuthor({
                          ...authorSlice.editAuthor,
                          bio: e.target.value,
                        })
                      );
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={authorSlice.editAuthor?.email}
                    onChange={(e) => {
                      dispatch(
                        setEditAuthor({
                          ...authorSlice.editAuthor,
                          email: e.target.value,
                        })
                      );
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
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
                data-bs-dismiss="modal"
                onClick={onSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
