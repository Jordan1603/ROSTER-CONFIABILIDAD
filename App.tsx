import React, { useState, useEffect, useCallback } from 'react';
import { RosterData, Category } from './types';
import { EMPLOYEES, YEAR } from './constants';
import EmployeeSelector from './components/EmployeeSelector';
import YearCalendar from './components/YearCalendar';
import CategoryModal from './components/CategoryModal';
import Legend from './components/Legend';
import MonthlyReport from './components/MonthlyReport';

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const [rosterData, setRosterData] = useState<RosterData>({});
  const [selectedEmployee, setSelectedEmployee] = useState<string>(EMPLOYEES[0].name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [selectedReportMonth, setSelectedReportMonth] = useState<number>(7); // Default to August

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('rosterData');
      if (savedData) {
        setRosterData(JSON.parse(savedData));
      } else {
        // Initialize with empty data if nothing is in localStorage
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

  const handleDayClick = useCallback((date: Date) => {
    setModalDate(date);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalDate(null);
  }, []);
  
  const handleSaveCategory = useCallback((date: Date, category: Category | null) => {
    const dateKey = formatDateKey(date);
    
    setRosterData(prevData => {
      const newEmployeeRoster = { ...(prevData[selectedEmployee] || {}) };
      
      if (category) {
        newEmployeeRoster[dateKey] = category;
      } else {
        delete newEmployeeRoster[dateKey];
      }

      const newRosterData = {
        ...prevData,
        [selectedEmployee]: newEmployeeRoster,
      };
      
      localStorage.setItem('rosterData', JSON.stringify(newRosterData));
      return newRosterData;
    });

    handleCloseModal();
  }, [selectedEmployee, handleCloseModal]);

  const employeeRoster = rosterData[selectedEmployee] || {};
  const selectedEmployeeObject = EMPLOYEES.find(emp => emp.name === selectedEmployee);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-950/70 backdrop-blur-sm p-4 sticky top-0 z-20 border-b border-slate-700">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">KOMATSU</h1>
              <p className="text-sm text-slate-400">Roster de Confiabilidad {YEAR}</p>
             </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3 lg:col-span-2">
          <div className="bg-slate-800 rounded-lg p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-3 border-b border-slate-600 pb-2">Empleados</h2>
            <EmployeeSelector
              employees={EMPLOYEES}
              selectedEmployee={selectedEmployee}
              onSelectEmployee={setSelectedEmployee}
            />
            <Legend />
          </div>
        </aside>

        <main className="md:col-span-9 lg:col-span-10">
          <div className="bg-slate-800 rounded-lg p-4 md:p-6 space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1 text-yellow-400">
                  {selectedEmployee}
                </h2>
                {selectedEmployeeObject && (
                  <span className="block text-base text-slate-300 font-normal">
                    {selectedEmployeeObject.position} - {selectedEmployeeObject.location}
                  </span>
                )}
              </div>
              
              <MonthlyReport
                employee={selectedEmployeeObject}
                roster={employeeRoster}
                year={YEAR}
                month={selectedReportMonth}
                onMonthChange={setSelectedReportMonth}
              />

              <YearCalendar
                year={YEAR}
                employeeRoster={employeeRoster}
                onDayClick={handleDayClick}
              />
          </div>
        </main>
      </div>
      
      {isModalOpen && modalDate && (
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
