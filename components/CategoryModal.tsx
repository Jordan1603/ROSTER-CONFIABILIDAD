
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Seleccionar Categoría</h2>
            <p className="text-sm text-blue-500 capitalize">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors text-2xl leading-none">&times;</button>
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
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            onClick={() => onSelectCategory(null)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
          >
            Quitar Categoría
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;