import React, { forwardRef } from 'react';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
}

const CategoryNav = forwardRef<HTMLElement, CategoryNavProps>(({ categories, activeCategory }, ref) => {
  return (
    <nav ref={ref} className="sticky top-0 z-10 py-3 bg-[#F5F5DC]/80 backdrop-blur-md shadow-sm">
      <ul className="flex flex-row items-center overflow-x-auto gap-3 px-4 pb-2 category-scrollbar">
        {categories.map((category) => (
          <li key={category}>
            <a
              href={`#${category}`}
              className={`block px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
                activeCategory === category
                  ? 'bg-[#800000] text-white shadow-md'
                  : 'text-[#4A2E2A] hover:bg-[#C0A062]/20'
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default CategoryNav;