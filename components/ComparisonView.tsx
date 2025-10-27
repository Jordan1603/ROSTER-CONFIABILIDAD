
import React from 'react';
import { RosterData } from '../types';
import ComparisonMonthTable from './ComparisonMonthTable';
import { EMPLOYEES } from '../constants';

interface ComparisonViewProps {
  year: number;
  selectedEmployees: string[];
  rosterData: RosterData;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ year, selectedEmployees, rosterData }) => {
  const months = Array.from({ length: 12 }, (_, i) => i);

  const selectedEmployeeObjects = selectedEmployees
    .map(name => EMPLOYEES.find(emp => emp.name === name))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-blue-600">
          Comparativo de Roster
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {selectedEmployeeObjects.map(emp => emp && (
            <div key={emp.name} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              <strong>{emp.name}</strong> ({emp.location})
            </div>
          ))}
        </div>
      </div>
       
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {months.map((month) => (
          <ComparisonMonthTable
            key={month}
            year={year}
            month={month}
            selectedEmployees={selectedEmployees}
            rosterData={rosterData}
          />
        ))}
      </div>
    </div>
  );
};

export default ComparisonView;
