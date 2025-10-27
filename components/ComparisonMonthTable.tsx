
import React from 'react';
import { RosterData } from '../types';
import { CATEGORY_DETAILS } from '../constants';

interface ComparisonMonthTableProps {
  year: number;
  month: number; // 0-indexed
  selectedEmployees: string[];
  rosterData: RosterData;
}

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};


const ComparisonMonthTable: React.FC<ComparisonMonthTableProps> = ({ year, month, selectedEmployees, rosterData }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const monthName = firstDayOfMonth.toLocaleString('es-ES', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
      <h3 className="font-bold text-center mb-2 capitalize text-blue-600">{monthName}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-1 border border-gray-300 sticky left-0 bg-gray-200 z-10">Día</th>
              {selectedEmployees.map(name => (
                <th key={name} className="p-1 border border-gray-300 font-semibold whitespace-nowrap" title={name}>
                  {getInitials(name)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => {
              const date = new Date(year, month, day);
              const dateKey = formatDateKey(date);
              const dayOfWeek = date.getDay();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

              return (
                <tr key={day} className={isWeekend ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-1 border border-gray-300 font-medium sticky left-0 bg-inherit z-10">{day}</td>
                  {selectedEmployees.map(name => {
                    const employeeRoster = rosterData[name] || {};
                    const category = employeeRoster[dateKey];
                    const details = category ? CATEGORY_DETAILS[category] : null;

                    return (
                      <td key={`${name}-${day}`} className="p-1 border border-gray-300 h-6">
                        {details && (
                          <span
                            className={`w-full h-full flex items-center justify-center rounded-sm font-bold ${details.color}`}
                            title={category}
                          >
                            {details.abbreviation}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonMonthTable;
