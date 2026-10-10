function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span>🔍</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;