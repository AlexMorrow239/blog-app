import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function FormImage({ image, onChange }) {
  const fileInput = useRef();
  const path = window.location.pathname;
  const isProfile = path === "/register" || path.startsWith("/profile");

  return (
    <div className="mb-3">
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
          className="image"
          style={{ height: { isProfile } ? "233px" : "150px" }}
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <img
            className={`${
              isProfile ? "avatar profile-img-upload" : "img-upload"
            }`}
            src={image}
            alt="blog.title"
          />
        </div>
      ) : (
        <div
          className="add-image"
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

FormImage.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
