
import React from 'react';

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div className="flex items-center space-x-2">
        <label htmlFor="year-select" className="text-sm font-medium text-gray-500">Año:</label>
        <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => onSelectYear(parseInt(e.target.value, 10))}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    </div>
  );
};

export default YearSelector;