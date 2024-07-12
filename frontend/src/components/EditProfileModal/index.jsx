import React, { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuthor,
  setEditAuthor,
  setAuthorImage,
} from "../../features/authorSlice";

import ProfileFormImage from "../../components/ProfileFormImage";

export default function EditProfileModal() {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [validation, setValidation] = useState({
    firstName: { isValid: true, message: "" },
    lastName: { isValid: true, message: "" },
    bio: { isValid: true, message: "" },
  });

  const formRef = useRef();
  const bioRef = useRef();

  const authorSlice = useSelector((state) => state.author);

  const editProfileModalRef = useRef(null);
  const editProfileModalInstance = useRef(null);

  useEffect(() => {
    if (editProfileModalRef.current) {
      editProfileModalInstance.current = new Modal(editProfileModalRef.current);
    }
  }, []);

  useEffect(() => {
    if (authorSlice.editAuthor) {
      validateForm();
      editProfileModalInstance.current?.show();
    } else {
      editProfileModalInstance.current?.hide();
    }
  }, [authorSlice.editAuthor]);

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

  const validateForm = () => {
    const newValidation = { ...validation };
    let isValid = true;

    if (!authorSlice.editAuthor.firstName.trim()) {
      newValidation.firstName = {
        isValid: false,
        message: "First Name is required.",
      };
      isValid = false;
    } else {
      newValidation.firstName = {
        isValid: true,
        message: "Looks good",
      };
    }

    if (!authorSlice.editAuthor.lastName.trim()) {
      newValidation.lastName = {
        isValid: false,
        message: "Last Name is required.",
      };
      isValid = false;
    } else {
      newValidation.lastName = {
        isValid: true,
        message: "Looks good",
      };
    }

    if (!authorSlice.editAuthor.bio.trim()) {
      newValidation.bio = {
        isValid: false,
        message: "Bio is required.",
      };
      if (
        bioRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        bioRef.current.classList.add("is-invalid");
        bioRef.current.classList.remove("is-valid");
      }
      isValid = false;
    } else {
      newValidation.bio = {
        isValid: true,
        message: "Looks good",
      };
      if (
        bioRef.current &&
        formRef.current.classList.contains("was-validated")
      ) {
        bioRef.current.classList.remove("is-invalid");
        bioRef.current.classList.add("is-valid");
      }
    }

    setValidation(newValidation);
    return isValid;
  };

  const resetValidation = () => {
    formRef.current.classList.remove("was-validated");
    if (bioRef.current) {
      bioRef.current.classList.remove("is-invalid", "is-valid");
    }
    setValidation({
      firstName: { isValid: true, message: "" },
      lastName: { isValid: true, message: "" },
      bio: { isValid: true, message: "" },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formRef.current.classList.add("was-validated");
    if (validateForm()) {
      const authorForm = buildFormData();
      if (authorSlice.editAuthor) {
        dispatch(updateAuthor(authorForm));
      }
      dispatch(setEditAuthor(null));
      formRef.current.classList.remove("was-validated");
      resetValidation();
      editProfileModalInstance.current?.hide();
    }
  };

  const onCloseModal = (e) => {
    e?.preventDefault();
    resetValidation();
    dispatch(setAuthorImage(authorSlice.editAuthor?.image || null));
    dispatch(setEditAuthor(null));
    editProfileModalInstance.current?.hide();
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
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
        ref={editProfileModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="editProfileModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form id="authorForm" ref={formRef} noValidate>
                <div>
                  <ProfileFormImage
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
                    value={authorSlice.editAuthor?.firstName || ""}
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
                  <div
                    className={
                      validation.firstName.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.firstName.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={authorSlice.editAuthor?.lastName || ""}
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
                  <div
                    className={
                      validation.lastName.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.lastName.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="bioInput" className="form-label">
                    Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bioInput"
                    value={authorSlice.editAuthor?.bio || ""}
                    ref={bioRef}
                    maxLength={300}
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
                  <div
                    style={{
                      position: "relative",
                      bottom: "1px",
                      left: "10px",
                      fontSize: "12px",
                      color: "#6c757d",
                    }}
                  >
                    {authorSlice.editAuthor?.bio.length}/300
                  </div>
                  <div
                    className={
                      validation.bio.isValid
                        ? "valid-feedback"
                        : "invalid-feedback"
                    }
                  >
                    {validation.bio.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={authorSlice.editAuthor?.email || ""}
                    onChange={(e) => {
                      dispatch(
                        setEditAuthor({
                          ...authorSlice.editAuthor,
                          email: e.target.value,
                        })
                      );
                    }}
                    required
                    autoComplete="email"
                    disabled
                    readOnly
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
