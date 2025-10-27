
import React from 'react';
import { EmployeeRoster, Category } from '../types';
import DayCell from './DayCell';

interface MonthCalendarProps {
  year: number;
  month: number; // 0-indexed
  employeeRoster: EmployeeRoster;
  onDayClick: (date: Date) => void;
}

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, month, employeeRoster, onDayClick }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const monthName = firstDayOfMonth.toLocaleString('es-ES', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingEmptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <div className="bg-slate-800/50 p-3 rounded-lg shadow-lg">
      <h3 className="font-bold text-center mb-2 capitalize text-yellow-300">{monthName}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-1">
        {weekDays.map((day, index) => (
          <div key={index} className="font-semibold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {leadingEmptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}
        {days.map((day) => {
          const date = new Date(year, month, day);
          const dateKey = formatDateKey(date);
          const category = employeeRoster[dateKey] || null;

          return (
            <DayCell
              key={dateKey}
              date={date}
              category={category}
              onClick={() => onDayClick(date)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendar;
