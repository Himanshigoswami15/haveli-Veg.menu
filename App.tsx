import React, { useState, useEffect, useRef } from 'react';
import { MENU_DATA } from './data/menuData';
import { MenuCategory } from './types';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import MenuSection from './components/MenuSection';
import PhoneIcon from './components/icons/PhoneIcon';
import EmailIcon from './components/icons/EmailIcon';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0]?.name || '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 72; // Estimate nav height
    const topMargin = navHeight + 20; // Add some extra buffer

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      // Adjust rootMargin to account for the sticky nav height
      { rootMargin: `-${topMargin}px 0px -60% 0px`, threshold: 0 }
    );

    const sectionsToObserve = Object.values(sectionRefs.current).filter((el): el is HTMLElement => el !== null);

    sectionsToObserve.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsToObserve.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#4A2E2A] selection:bg-[#C0A062] selection:text-white">
      <Header />
      <CategoryNav
        ref={navRef}
        categories={MENU_DATA.map(cat => cat.name)}
        activeCategory={activeCategory}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <main className="w-full space-y-12">
            {MENU_DATA.map((category: MenuCategory) => (
              <div
                key={category.name}
                id={category.name}
                ref={(el) => {
                  sectionRefs.current[category.name] = el;
                }}
              >
                <MenuSection category={category} />
              </div>
            ))}
          </main>
        </div>
      </div>
       <footer className="text-center py-6 text-sm text-[#8B4513]/70">
            <p className="mb-2">Shaktiman Palace, Shaktiman Nagar, Barmer, Rajasthan-344001</p>
            <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap px-4">
                <a href="tel:+91-9928112220" className="flex items-center hover:text-[#C0A062] transition-colors duration-300">
                    <PhoneIcon />
                    <span>+91-9928112220</span>
                </a>
                <a href="mailto:admin@thehaveliresorts.com" className="flex items-center hover:text-[#C0A062] transition-colors duration-300">
                    <EmailIcon />
                    <span>admin@thehaveliresorts.com</span>
                </a>
            </div>
             <a href="http://www.thehaveliresorts.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 hover:text-[#C0A062] transition-colors duration-300">
                www.thehaveliresorts.com
            </a>
       </footer>
    </div>
  );
};

export default App;