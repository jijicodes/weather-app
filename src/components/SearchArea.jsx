import React, { useState } from "react";
import "./SearchArea.css";
export const SearchArea = ({ onSubmit: submitCallback }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <form
        className="searchInput"
        onSubmit={(e) => {
          submitCallback(searchText);
          e.preventDefault();
        }}
      >
        <div>
          <input
            className="search-field"
            placeholder="enter your city"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-button" type="submit">
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};
