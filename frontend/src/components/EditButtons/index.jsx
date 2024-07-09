import "./index.css";

export default function EditButtons({ onEdit, onDelete }) {
  const path = window.location.pathname;

  let rightPencil = "32px";
  let isBlogs = false;
  if (path.startsWith("/blogs") || path.startsWith("/profile")) {
    rightPencil = "40px";
    isBlogs = true;
  }

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: rightPencil,
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className={`btn ${
          isBlogs ? "btn-dark" : "btn-outline-dark"
        } py-1 px-2 me-2`}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "5px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className={`btn ${
          isBlogs ? "btn-dark" : "btn-outline-dark"
        } py-1 px-2 me-2`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </>
  );
}
