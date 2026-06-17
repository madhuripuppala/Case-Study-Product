import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onSortChange, sortOption }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search products by name, category, or description..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
          maxLength={100}
        />
        {query && (
          <button onClick={handleClear} className="clear-btn" title="Clear search">
            ✕
          </button>
        )}
      </div>

      <div className="sort-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange} className="sort-select">
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
