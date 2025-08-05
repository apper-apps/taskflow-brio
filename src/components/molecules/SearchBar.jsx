import React, { useState } from "react";
import Input from "@/components/atoms/Input";

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = "" }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={className}>
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        icon="Search"
        className="bg-surface/30 border-slate-700 focus:bg-surface/50"
      />
    </div>
  );
};

export default SearchBar;