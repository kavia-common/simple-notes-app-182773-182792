import React from "react";
import NoteCard from "./NoteCard";

/**
 * PUBLIC_INTERFACE
 * NotesList
 * Grid container for notes.
 */
export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div style={{ color: "var(--ink-muted)", padding: 24 }}>
        No notes yet. Click the + button to create your first note.
      </div>
    );
  }
  return (
    <section className="notes-grid" aria-label="Notes list">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
