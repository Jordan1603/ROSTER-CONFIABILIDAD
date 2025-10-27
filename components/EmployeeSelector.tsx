
import React from 'react';
import { Employee } from '../types';

interface EmployeeSelectorProps {
  employees: Employee[];
  selectedEmployee: string;
  onSelectEmployee: (employee: string) => void;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ employees, selectedEmployee, onSelectEmployee }) => {
  return (
    <nav>
      <ul className="space-y-1">
        {employees.map((employee) => (
          <li key={employee.name}>
            <button
              onClick={() => onSelectEmployee(employee.name)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                selectedEmployee === employee.name
                  ? 'bg-yellow-400 text-slate-900 shadow-md'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {employee.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default EmployeeSelector;