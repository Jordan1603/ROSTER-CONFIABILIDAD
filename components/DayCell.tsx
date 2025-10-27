
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

  const baseClasses = "aspect-square flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400";
  
  const categoryClasses = categoryDetails 
    ? categoryDetails.color
    : "bg-slate-700 text-slate-300 hover:bg-slate-600";

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
