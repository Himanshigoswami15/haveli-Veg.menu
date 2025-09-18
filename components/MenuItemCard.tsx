import React from 'react';
import { MenuItem } from '../types';
import VegIcon from './icons/VegIcon';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-[#C0A062]/20 hover:shadow-lg hover:border-[#C0A062]/50 transition-shadow duration-300 flex flex-col overflow-hidden">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-1">
        <div className="pt-1 mr-4">
          <VegIcon />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-lg text-[#800000] pr-2">{item.name}</h4>
            <span className="text-lg font-bold text-[#4A2E2A] whitespace-nowrap">
              ₹{item.price}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-[#4A2E2A]/80 leading-snug">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
