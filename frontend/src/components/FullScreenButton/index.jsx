import React from "react";

import { CATEGORY_DESCRIPTION_LIMIT } from "../../constants";

export default function FullScreenButton({
  onFullScreen,
  orientation,
  descriptionLength,
}) {
  let right = "0px";
  if (orientation === "left") {
    right = "62px";
  } else if (orientation === "right") {
    right = "5px";
  }

  if (descriptionLength < CATEGORY_DESCRIPTION_LIMIT) return null;

  return (
    <button
      style={{
        position: "absolute",
        top: "10px",
        right,
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className="btn"
      onClick={(e) => {
        e.stopPropagation();
        onFullScreen();
      }}
    >
      <i className="bi bi-arrows-fullscreen edit-btn-icon p-1"></i>
    </button>
  );
}
