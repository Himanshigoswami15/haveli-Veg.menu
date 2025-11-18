import React, { useRef, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="sticky top-0 z-10 py-3 bg-[#F5F5DC]/80 backdrop-blur-md shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#4A2E2A]/60">
            <SearchIcon />
          </div>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for dishes..."
            className="block w-full py-2 px-4 pl-10 text-lg bg-white/60 border border-[#C0A062]/50 rounded-lg focus:ring-[#C0A062] focus:border-[#C0A062] transition placeholder:text-[#4A2E2A]/50 h-11"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-[#C0A062]/20 text-[#4A2E2A]"
          aria-label="Close search"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
