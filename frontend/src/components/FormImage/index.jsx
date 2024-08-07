import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function FormImage({ image, onChange }) {
  const fileInput = useRef();

  return (
    <div className="mb-3">
      <label htmlFor="fileInput" className="form-label">
        <span className="text">Image (optional)</span>
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
          className="image img-upload"
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <img className="img-upload" src={image} alt="blog.title" />
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
