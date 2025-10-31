import React from "react";

/**
 * PUBLIC_INTERFACE
 * NoteCard
 * Displays a single note preview with title, snippet, and actions.
 */
export default function NoteCard({ note, onEdit, onDelete }) {
  const date = new Date(note.updatedAt || note.createdAt);
  const meta = date.toLocaleString();

  return (
    <article className="note-card" role="article" aria-label={`Note ${note.title}`}>
      <h3 className="note-card__title">{note.title || "Untitled"}</h3>
      <p className="note-card__content">
        {note.content ? note.content.slice(0, 160) : "No content yet..."}
        {note.content && note.content.length > 160 ? "…" : ""}
      </p>
      <div className="note-card__meta">
        <span aria-label="Last updated" title={`Last updated ${meta}`}>{meta}</span>
        <span>
          <button
            className="icon-btn"
            aria-label={`Edit ${note.title || "note"}`}
            onClick={() => onEdit(note)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="icon-btn"
            aria-label={`Delete ${note.title || "note"}`}
            onClick={() => onDelete(note)}
            title="Delete"
          >
            🗑️
          </button>
        </span>
      </div>
    </article>
  );
}
