import React, { useRef } from 'react';

const SearchField = ({ placeholder, onFetchUser }) => {
  const searchInput = useRef(null);

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          ref={searchInput}
          type="text"
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onFetchUser && onFetchUser(searchInput.current.value);
            }
          }}
        />
      </div>
      <div className="control">
        <button type="button" className="button is-info" onClick={() => onFetchUser(searchInput.current.value)}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchField;
