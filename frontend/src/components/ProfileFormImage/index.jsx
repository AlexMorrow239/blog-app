import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function ProfileFormImage({ image, onChange }) {
  const fileInput = useRef();
  const path = window.location.pathname;

  return (
    <div className={image ? "" : "mb-3"}>
      <label htmlFor="fileInput" className="form-label">
        {path === "/register" ? "Image (optional)" : "Image"}
      </label>
      <input
        ref={fileInput}
        style={{ display: "none" }}
        id="fileInput"
        type="file"
        name="img"
        onChange={onChange}
      ></input>
      {image ? (
        <div
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <img className="avatar img-thumbnail" src={image} alt="blog.title" />
        </div>
      ) : (
        <div
          className="profile-add-image m-auto"
          title="Add Image"
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <i className="bi bi-plus"></i>
        </div>
      )}
    </div>
  );
}

ProfileFormImage.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
