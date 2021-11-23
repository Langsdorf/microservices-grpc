import React from "react";

export default function Modal({
  children,
  open,
  handleClose,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: Function;
}) {
  return (
    <>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => {
                handleClose();
              }}
            >
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
