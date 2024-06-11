import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Toast } from "bootstrap";

export default function SuccessToast({ show, message, onClose }) {
  let [successToast, setSuccessToast] = useState(null);

  useEffect(() => {
    const successEl = document.getElementById("successToast");
    const successToast = successEl
      ? new Toast(successEl, {
          autohide: false,
        })
      : null;

    if (show && successToast) {
      successToast?.show();
      setSuccessToast(successToast);
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="successToast"
        className="toast bg-success text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              onClose();
              successToast?.hide();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

SuccessToast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
