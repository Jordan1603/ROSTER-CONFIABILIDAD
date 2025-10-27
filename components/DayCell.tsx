
import React from 'react';
import { Category } from '../types';
import { CATEGORY_DETAILS } from '../constants';

interface DayCellProps {
  date: Date;
  category: Category | null;
  onClick: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, category, onClick }) => {
  const dayNumber = date.getDate();
  const categoryDetails = category ? CATEGORY_DETAILS[category] : null;

  const baseClasses = "aspect-square flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  
  const categoryClasses = categoryDetails 
    ? categoryDetails.color
    : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${categoryClasses}`}
      aria-label={`Día ${dayNumber}, Categoría: ${category || 'Sin asignar'}`}
    >
      {dayNumber}
    </button>
  );
};

export default DayCell;