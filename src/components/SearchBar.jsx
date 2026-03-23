import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // only search if query is not empty
    if (query.trim()) {
      onSearch(query);     // call parent function
      setQuery("");        // optional: clear input after search
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}   // 👈 the missing piece
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;