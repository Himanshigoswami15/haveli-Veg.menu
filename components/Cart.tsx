import React, { useEffect, useRef } from 'react';
import { CartItem, MenuItem } from '../types';
import CloseIcon from './icons/CloseIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import TrashIcon from './icons/TrashIcon';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (item: MenuItem, quantity: number) => void;
  onRemoveItem: (itemName: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'bg-black/60 opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        ref={cartRef}
        className={`w-full max-w-md h-full bg-[#F5F5DC] text-[#4A2E2A] flex flex-col shadow-2xl absolute right-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="p-4 flex justify-between items-center border-b-2 border-[#C0A062]/50 flex-shrink-0">
          <h2 className="font-cinzel text-2xl font-bold text-[#800000]">Your Selections</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#C0A062]/20" aria-label="Close cart">
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-[#4A2E2A]/70">Your cart is empty.</p>
                <p className="text-sm text-[#4A2E2A]/60">Add some delicious dishes from the menu!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.name} className="flex items-center gap-4 animate-fade-in">
                  <div className="flex-1">
                    <p className="font-bold text-[#800000]">{item.name}</p>
                    <span className="text-sm text-[#4A2E2A]/80">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={() => onUpdateQuantity(item, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-[#C0A062]/20 text-[#800000] rounded-full hover:bg-[#C0A062]/40 transition-colors" aria-label={`Decrease quantity of ${item.name}`}>
                        <MinusIcon />
                     </button>
                     <span className="font-bold w-6 text-center">{item.quantity}</span>
                     <button onClick={() => onUpdateQuantity(item, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-[#800000] text-white rounded-full hover:bg-[#6d0000] transition-colors" aria-label={`Increase quantity of ${item.name}`}>
                        <PlusIcon />
                     </button>
                  </div>
                   <button onClick={() => onRemoveItem(item.name)} className="text-red-800/70 hover:text-red-600 transition-colors" aria-label={`Remove ${item.name} from cart`}>
                      <TrashIcon />
                   </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <footer className="p-4 border-t border-[#C0A062]/50 flex-shrink-0">
            <p className="text-center text-sm text-[#4A2E2A]/90 italic">
                Our attentive staff is ready to assist you with your order. Please show them your selections.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default Cart;
