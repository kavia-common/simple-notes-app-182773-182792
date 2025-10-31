import React, { useEffect, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * NoteEditor
 * Modal editor panel with lined paper aesthetic.
 */
export default function NoteEditor({ open, initial, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || "");
      setContent(initial?.content || "");
      setTimeout(() => {
        panelRef.current?.focus();
      }, 0);
    }
  }, [open, initial]);

  const handleSave = () => {
    const payload = { title: title.trim() || "Untitled", content };
    onSave(payload);
  };

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel"
        tabIndex={-1}
        ref={panelRef}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
          }
        }}
      >
        <div className="papernote__spiral" aria-hidden="true">
          <svg viewBox="0 0 100 48" preserveAspectRatio="none">
            {/* Simple repeated loops across width by using a pattern of circles via <defs> is complex; approximate with a polyline bar */}
            <rect x="0" y="0" width="100" height="6" fill="rgba(0,0,0,0.65)"></rect>
            {/* Decorative loops */}
            {Array.from({ length: 12 }).map((_, i) => {
              const cx = 6 + i * (100 / 12);
              return (
                <circle key={i} cx={cx} cy="22" r="6" stroke="var(--spiral)" strokeWidth="3" fill="transparent" />
              );
            })}
          </svg>
        </div>

        <div className="modal-header">
          <strong id="editor-title">{initial ? "Edit Note" : "New Note"}</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost btn" onClick={onClose}>Cancel</button>
            <button className="btn" onClick={handleSave}>Save</button>
          </div>
        </div>

        <div className="modal-body">
          <label className="visually-hidden" htmlFor="note-title">Title</label>
          <input
            id="note-title"
            className="input-title"
            placeholder="Note title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="visually-hidden" htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            className="textarea-content"
            placeholder="Start typing on the lined paper…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <span style={{ flex: 1, color: "var(--ink-muted)", fontSize: 12 }}>
            Tip: Press Ctrl/Cmd + S to save, Esc to close
          </span>
          <button className="btn-ghost btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
