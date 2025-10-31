import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header component for the app with title, search input, and primary action.
 */
export default function Header({ onAdd, query, onQuery }) {
  return (
    <header className="header" role="banner">
      <div className="header__title" aria-label="Old Notepad App Title">
        Old Notepad
      </div>
      <div className="header__actions">
        <label className="visually-hidden" htmlFor="search-notes">Search Notes</label>
        <input
          id="search-notes"
          className="header__search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Search notes"
        />
        <button className="btn" onClick={onAdd} aria-label="Create new note">
          + New Note
        </button>
      </div>
    </header>
  );
}
