import "./index.css";

export default function EditButtons({ onEdit, onDelete, onNavigate }) {
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
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <i className="bi bi-pencil-fill edit-btn-icon p-1"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "32px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <i className="bi bi-trash-fill edit-btn-icon p-1"></i>
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
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate();
        }}
      >
        <i className="bi bi-arrows-fullscreen edit-btn-icon p-1"></i>
      </button>
    </>
  );
}
