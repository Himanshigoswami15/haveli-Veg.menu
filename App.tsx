import React, { useState, useEffect, useRef } from 'react';
import { MENU_DATA } from './data/menuData';
import { MenuCategory, MenuItem, CartItem } from './types';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import MenuSection from './components/MenuSection';
import PhoneIcon from './components/icons/PhoneIcon';
import EmailIcon from './components/icons/EmailIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import Cart from './components/Cart';
import CartIcon from './components/icons/CartIcon';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0]?.name || '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleUpdateQuantity = (itemToUpdate: MenuItem, newQuantity: number) => {
    setCartItems(currentItems => {
      if (newQuantity <= 0) {
        return currentItems.filter(item => item.name !== itemToUpdate.name);
      }

      const itemExists = currentItems.some(item => item.name === itemToUpdate.name);

      if (itemExists) {
        return currentItems.map(item =>
          item.name === itemToUpdate.name ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...currentItems, { ...itemToUpdate, quantity: newQuantity }];
      }
    });
  };
  
  const handleRemoveFromCart = (itemName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

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
                <MenuSection 
                  category={category}
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              </div>
            ))}
          </main>
        </div>
      </div>

       <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-[#800000] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-[#6d0000] transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0A062]"
        aria-label={`View your selections, ${totalItemsInCart} items`}
      >
        <CartIcon />
        {totalItemsInCart > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#C0A062] text-[#4A2E2A] text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-[#F5F5DC]">
            {totalItemsInCart}
          </span>
        )}
      </button>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

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
                 <a href="https://www.instagram.com/thehaveli.resort?igsh=MWl6MDdhc3lmajZt" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#C0A062] transition-colors duration-300">
                    <InstagramIcon />
                    <span>@thehaveli.resort</span>
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