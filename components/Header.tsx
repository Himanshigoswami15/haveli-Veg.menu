import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 bg-gradient-to-b from-[#800000]/10 to-transparent">
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
