
import React, { useState, useEffect, useCallback } from 'react';
import { RosterData, Category } from './types';
import { EMPLOYEES, START_YEAR } from './constants';
import EmployeeSelector from './components/EmployeeSelector';
import YearCalendar from './components/YearCalendar';
import CategoryModal from './components/CategoryModal';
import Legend from './components/Legend';
import MonthlyReport from './components/MonthlyReport';
import YearSelector from './components/YearSelector';
import ComparisonView from './components/ComparisonView';

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const [rosterData, setRosterData] = useState<RosterData>({});
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([EMPLOYEES[0].name]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(START_YEAR);
  const [selectedReportMonth, setSelectedReportMonth] = useState<number>(7); // Default to August

  const availableYears = [2025, 2026, 2027, 2028];

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('rosterData');
      if (savedData) {
        setRosterData(JSON.parse(savedData));
      } else {
        const initialData: RosterData = {};
        EMPLOYEES.forEach(emp => {
          initialData[emp.name] = {};
        });
        setRosterData(initialData);
      }
    } catch (error) {
      console.error("Failed to load or parse roster data from localStorage", error);
    }
  }, []);

  const handleToggleEmployee = useCallback((employeeName: string) => {
    setSelectedEmployees(prevSelected => {
      const isSelected = prevSelected.includes(employeeName);
      if (isSelected) {
        if (prevSelected.length === 1) return prevSelected; // Prevent deselecting the last one
        return prevSelected.filter(name => name !== employeeName);
      } else {
        if (prevSelected.length >= 4) {
          alert('Puedes comparar un máximo de 4 trabajadores a la vez.');
          return prevSelected;
        }
        return [...prevSelected, employeeName];
      }
    });
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    if (selectedEmployees.length > 1) return; // Disable editing in comparison mode
    setModalDate(date);
    setIsModalOpen(true);
  }, [selectedEmployees.length]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalDate(null);
  }, []);
  
  const handleSaveCategory = useCallback((date: Date, category: Category | null) => {
    if (selectedEmployees.length !== 1) return;
    const employeeToUpdate = selectedEmployees[0];
    const dateKey = formatDateKey(date);
    
    setRosterData(prevData => {
      const newEmployeeRoster = { ...(prevData[employeeToUpdate] || {}) };
      
      if (category) {
        newEmployeeRoster[dateKey] = category;
      } else {
        delete newEmployeeRoster[dateKey];
      }

      const newRosterData = {
        ...prevData,
        [employeeToUpdate]: newEmployeeRoster,
      };
      
      localStorage.setItem('rosterData', JSON.stringify(newRosterData));
      return newRosterData;
    });

    handleCloseModal();
  }, [selectedEmployees, handleCloseModal]);

  const isSingleView = selectedEmployees.length === 1;
  const currentEmployeeName = isSingleView ? selectedEmployees[0] : '';
  const employeeRoster = rosterData[currentEmployeeName] || {};
  const selectedEmployeeObject = EMPLOYEES.find(emp => emp.name === currentEmployeeName);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white/80 backdrop-blur-sm p-3 sticky top-0 z-20 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Komatsu Mitsui Logo */}
            <div className="flex h-10 overflow-hidden rounded-lg shadow-sm border border-gray-200/50">
              <div className="bg-[#0033A0] flex items-center justify-center px-4">
                <span className="text-white text-xl font-black tracking-tighter">KOMATSU</span>
              </div>
              <div className="bg-gray-200 flex items-center justify-center px-4">
                <span className="text-black text-xl font-black italic -skew-x-12">MITSUI</span>
              </div>
            </div>
            <h1 className="text-md sm:text-lg font-bold text-gray-700 whitespace-nowrap">
              Roster de Confiabilidad
            </h1>
          </div>
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />
        </div>
      </header>

      <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        <aside className="md:col-span-3 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-3 sticky top-24">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-2">Empleados</h2>
            <EmployeeSelector
              employees={EMPLOYEES}
              selectedEmployees={selectedEmployees}
              onToggleEmployee={handleToggleEmployee}
            />
            <Legend />
          </div>
        </aside>

        <main className="md:col-span-9 lg:col-span-10">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-6">
            {isSingleView ? (
              <>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1 text-blue-600">
                    {currentEmployeeName}
                  </h2>
                  {selectedEmployeeObject && (
                    <span className="block text-base text-gray-600 font-normal">
                      {selectedEmployeeObject.position} - {selectedEmployeeObject.location}
                    </span>
                  )}
                </div>
                
                <MonthlyReport
                  employee={selectedEmployeeObject}
                  roster={employeeRoster}
                  year={selectedYear}
                  month={selectedReportMonth}
                  onMonthChange={setSelectedReportMonth}
                />

                <YearCalendar
                  year={selectedYear}
                  employeeRoster={employeeRoster}
                  onDayClick={handleDayClick}
                />
              </>
            ) : (
              <ComparisonView 
                year={selectedYear}
                selectedEmployees={selectedEmployees}
                rosterData={rosterData}
              />
            )}
          </div>
        </main>
      </div>
      
      {isModalOpen && modalDate && isSingleView && (
        <CategoryModal
          isOpen={isModalOpen}
          date={modalDate}
          currentCategory={employeeRoster[formatDateKey(modalDate)] || null}
          onSelectCategory={(category) => handleSaveCategory(modalDate, category)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
