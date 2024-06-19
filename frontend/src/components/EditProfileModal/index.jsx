import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";

import { updateAuthor } from "../../features/authorSlice";

import FormImage from "../FormImage";

export default function EditProfileModal({ editAuthor, setEditAuthor }) {
  const dispatch = useDispatch();

  const [authorImage, setAuthorImage] = useState(editAuthor?.image);
  console.log(authorImage);

  const modalEl = document.getElementById("editProfileModal");
  const editProfileModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (editAuthor) {
      setAuthorImage(editAuthor.image);
      editProfileModal.show();
    }
  }, [editAuthor, editProfileModal]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("id", editAuthor._id);
    formData.append("image", editAuthor.image);
    formData.append("firstName", editAuthor.firstName);
    formData.append("lastName", editAuthor.lastName);
    formData.append("bio", editAuthor.bio);
    formData.append("email", editAuthor.email);
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
      if (editAuthor) {
        dispatch(updateAuthor(authorForm));
      }
    }
    editProfileModal?.hide();
    setEditAuthor(null);
  };

  const onCloseModal = (e) => {
    e?.preventDefault();
    editProfileModal?.hide();
    setEditAuthor(null);
  };

  const onImageChange = (e) => {
    e?.preventDefault();

    if (e?.target?.files?.length) {
      const file = e.target.files[0];
      setAuthorImage(URL.createObjectURL(file));
      setEditAuthor({ ...editAuthor, image: file });
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
                  <FormImage image={authorImage} onChange={onImageChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={editAuthor?.firstName}
                    onChange={(e) => {
                      setEditAuthor({
                        ...editAuthor,
                        firstName: e.target.value,
                      });
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
                    value={editAuthor?.lastName}
                    onChange={(e) => {
                      setEditAuthor({
                        ...editAuthor,
                        lastName: e.target.value,
                      });
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
                    value={editAuthor?.bio}
                    onChange={(e) => {
                      setEditAuthor({ ...editAuthor, bio: e.target.value });
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
                    value={editAuthor?.email}
                    onChange={(e) => {
                      setEditAuthor({ ...editAuthor, email: e.target.value });
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
                className="btn btn-primary"
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
