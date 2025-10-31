import React, { useMemo, useState } from "react";
import "./styles/theme.css";
import "./styles/notepad.css";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import ConfirmDialog from "./components/ConfirmDialog";
import { useLocalNotes } from "./hooks/useLocalNotes";

/**
 * PUBLIC_INTERFACE
 * App
 * The main application shell for the Old Notepad themed notes app.
 */
export default function App() {
  const {
    notes,
    filtered,
    query,
    setQuery,
    createNote,
    updateNote,
    deleteNote,
  } = useLocalNotes();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const onAdd = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const onEdit = (note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  const onDelete = (note) => {
    setPendingDelete(note);
    setConfirmOpen(true);
  };

  const onSave = (payload) => {
    if (editing) {
      updateNote(editing.id, payload);
    } else {
      createNote(payload);
    }
    setEditorOpen(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteNote(pendingDelete.id);
    }
    setPendingDelete(null);
    setConfirmOpen(false);
  };

  const cancelDelete = () => {
    setPendingDelete(null);
    setConfirmOpen(false);
  };

  const title = useMemo(() => "Old Notepad", []);

  return (
    <div className="app-shell">
      <Header onAdd={onAdd} query={query} onQuery={setQuery} title={title} />

      <main className="main" role="main">
        <NotesList notes={filtered} onEdit={onEdit} onDelete={onDelete} />
      </main>

      <button
        className="fab"
        aria-label="Add note"
        title="Add note"
        onClick={onAdd}
      >
        +
      </button>

      <NoteEditor
        open={editorOpen}
        initial={editing}
        onClose={() => { setEditorOpen(false); setEditing(null); }}
        onSave={onSave}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete note?"
        message={pendingDelete ? `Are you sure you want to delete "${pendingDelete.title || "Untitled"}"?` : ""}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
