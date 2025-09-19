
import React from 'react';
import { MenuCategory, CartItem, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategory;
  cartItems: CartItem[];
  onUpdateQuantity: (item: MenuItem, quantity: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, cartItems, onUpdateQuantity }) => {
  return (
    <section>
      <h2 className="font-cinzel text-4xl font-bold text-[#800000] mb-6 pb-2 border-b-2 border-[#C0A062]/50 scroll-mt-24">
        {category.name}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.items.map((item) => (
          <MenuItemCard 
            key={item.name} 
            item={item}
            cartItem={cartItems.find(ci => ci.name === item.name)}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
