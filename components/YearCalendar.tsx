
import React from 'react';
import { EmployeeRoster } from '../types';
import MonthCalendar from './MonthCalendar';

interface YearCalendarProps {
  year: number;
  employeeRoster: EmployeeRoster;
  onDayClick: (date: Date) => void;
}

const YearCalendar: React.FC<YearCalendarProps> = ({ year, employeeRoster, onDayClick }) => {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {months.map((month) => (
        <MonthCalendar
          key={month}
          year={year}
          month={month}
          employeeRoster={employeeRoster}
          onDayClick={onDayClick}
        />
      ))}
    </div>
  );
};

export default YearCalendar;
