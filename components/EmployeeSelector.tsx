
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
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                selectedEmployee === employee.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
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