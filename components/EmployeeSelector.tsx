
import React from 'react';
import { Employee } from '../types';

interface EmployeeSelectorProps {
  employees: Employee[];
  selectedEmployees: string[];
  onToggleEmployee: (employee: string) => void;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ employees, selectedEmployees, onToggleEmployee }) => {
  return (
    <nav>
      <p className="text-xs text-gray-500 mb-2 px-2">Seleccione hasta 4 para comparar.</p>
      <ul className="space-y-1">
        {employees.map((employee) => {
          const isSelected = selectedEmployees.includes(employee.name);
          return (
            <li key={employee.name}>
              <button
                onClick={() => onToggleEmployee(employee.name)}
                className={`w-full text-left px-2 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 flex items-center ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                    <div 
                        className={`w-full h-full rounded-sm border-2 transition-all duration-150 flex items-center justify-center ${
                            isSelected ? 'bg-white border-blue-300' : 'border-gray-400 bg-white'
                        }`}
                    >
                        {isSelected && (
                             <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
                <span>{employee.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default EmployeeSelector;
