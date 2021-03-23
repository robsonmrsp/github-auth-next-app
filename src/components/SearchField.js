import React, { useRef } from 'react';

const SearchField = ({ placeholder, onFetchUser }) => {
  const searchInput = useRef(null);

  return (
    <div className="is-four-fifths">
      <div className="columns ">
        <div className="column is-4">
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
        </div>
        <div className="column is-8">
          <div className="control">
            <button type="button" className="button is-info" onClick={() => onFetchUser(searchInput.current.value)}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
