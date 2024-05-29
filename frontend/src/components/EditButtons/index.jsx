import React from "react";

export default function EditButtons({ onEdit, onDelete }) {
  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "60px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className="btn"
        onClick={onEdit}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "35px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className="btn"
        onClick={onDelete}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </>
  );
}
