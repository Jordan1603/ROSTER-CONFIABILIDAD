import React from 'react';
import { CATEGORIES, CATEGORY_DETAILS } from '../constants';

const Legend: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 border-b border-slate-600 pb-2">Leyenda</h3>
      <ul className="space-y-2 mt-2">
        {CATEGORIES.map((category) => {
          const details = CATEGORY_DETAILS[category];
          return (
            <li key={category} className="flex items-center text-sm">
              <span className={`w-8 h-5 rounded mr-2 flex items-center justify-center font-bold text-xs ${details.color}`}>
                {details.abbreviation}
              </span>
              <span className="text-slate-300">{category}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Legend;
