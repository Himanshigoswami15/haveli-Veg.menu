import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface HeaderProps {
  onToggleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSearch }) => {
  return (
    <header className="py-8 bg-gradient-to-b from-[#800000]/10 to-transparent relative">
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={onToggleSearch}
          className="p-3 rounded-full text-[#800000] bg-white/40 backdrop-blur-sm hover:bg-[#C0A062]/20 transition-colors shadow-md"
          aria-label="Open or close search"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="text-center flex flex-col items-center">
        <img src="https://ik.imagekit.io/j1fgksdwx/haveli%20logo.png?updatedAt=1757953623873" alt="Haveli Logo" className="h-64 md:h-96" />
        <p className="font-cinzel text-2xl text-[#C0A062] -mt-12 md:-mt-16 tracking-widest">
          Khamma Ghani Sa
        </p>
      </div>
    </header>
  );
};

export default Header;
