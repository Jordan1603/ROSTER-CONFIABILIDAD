
import React, { useEffect, useRef } from 'react';
import { Category } from '../types';
import { CATEGORIES, CATEGORY_DETAILS } from '../constants';

interface CategoryModalProps {
  isOpen: boolean;
  date: Date;
  currentCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, date, currentCategory, onSelectCategory, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  
  const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Seleccionar Categoría</h2>
            <p className="text-sm text-yellow-300 capitalize">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">&times;</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105 ${CATEGORY_DETAILS[category].color}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="mt-6 border-t border-slate-700 pt-4">
          <button
            onClick={() => onSelectCategory(null)}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Quitar Categoría
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
