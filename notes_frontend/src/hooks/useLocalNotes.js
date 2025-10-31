import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useLocalNotes
 * A small state manager for notes persisted to localStorage.
 * Keys are stored under "old-notepad-notes".
 */
export function useLocalNotes() {
  const storageKey = "old-notepad-notes";
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      }
    } catch {
      // ignore corruption
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch {
      // storage might be unavailable
    }
  }, [notes]);

  // PUBLIC_INTERFACE
  const createNote = useCallback((partial) => {
    const now = Date.now();
    const genId = () => {
      try {
        // crypto may be unavailable in older browsers
        return crypto.randomUUID();
      } catch {
        return String(now) + Math.random().toString(16).slice(2);
      }
    };
    const newNote = {
      id: genId(),
      title: (partial.title || "Untitled"),
      content: (partial.content || ""),
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  // PUBLIC_INTERFACE
  const updateNote = useCallback((id, changes) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes, updatedAt: Date.now() } : n))
    );
  }, []);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // PUBLIC_INTERFACE
  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        (n.title || "").toLowerCase().includes(q) ||
        (n.content || "").toLowerCase().includes(q)
    );
  }, [notes, query]);

  return {
    notes,
    filtered,
    query,
    setQuery,
    createNote,
    updateNote,
    deleteNote,
  };
}
