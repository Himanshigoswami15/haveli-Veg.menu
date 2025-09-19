import React from 'react';
import { MenuItem, CartItem } from '../types';
import VegIcon from './icons/VegIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface MenuItemCardProps {
  item: MenuItem;
  cartItem?: CartItem;
  onUpdateQuantity: (item: MenuItem, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, cartItem, onUpdateQuantity }) => {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-[#C0A062]/20 hover:shadow-lg hover:border-[#C0A062]/50 transition-shadow duration-300 flex flex-col overflow-hidden">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex">
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

        <div className="mt-4 flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={() => onUpdateQuantity(item, 1)}
              className="px-6 py-2 bg-[#800000] text-white font-semibold rounded-md hover:bg-[#6d0000] transition-colors duration-300 transform active:scale-95"
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center bg-[#C0A062]/20 text-[#800000] rounded-full hover:bg-[#C0A062]/40 transition-colors duration-200"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <MinusIcon />
              </button>
              <span className="font-bold text-lg w-8 text-center" aria-live="polite">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-[#800000] text-white rounded-full hover:bg-[#6d0000] transition-colors duration-200"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
