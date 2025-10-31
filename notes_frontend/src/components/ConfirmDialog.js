import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ConfirmDialog
 * Simple confirmation modal for destructive actions.
 */
export default function ConfirmDialog({ open, title = "Confirm", message, onCancel, onConfirm }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => ref.current?.focus(), 0);
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div
        className="confirm-panel"
        tabIndex={-1}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
          if (e.key === "Enter") onConfirm();
        }}
      >
        <div className="confirm-header" id="confirm-title">{title}</div>
        <div className="confirm-body">{message}</div>
        <div className="confirm-footer">
          <button className="btn-ghost btn" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
