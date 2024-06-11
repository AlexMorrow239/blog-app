import React, { useEffect, useState } from "react";
import { Toast } from "bootstrap";
import PropTypes from "prop-types";

export default function ErrorToast({ show, message, onClose }) {
  let [errorToast, setErrorToast] = useState(null);

  useEffect(() => {
    const errorEl = document.getElementById("errorToast");
    const errorToast = errorEl
      ? new Toast(errorEl, {
          autohide: false,
        })
      : null;
    if (show && errorToast) {
      errorToast?.show();
      setErrorToast(errorToast);
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="errorToast"
        className="toast bg-danger text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Error</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              onClose();
              errorToast?.hide();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

ErrorToast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
