
import React, { useState, useEffect } from 'react';
import { Employee, EmployeeRoster, Category } from '../types';
import { CATEGORIES, CATEGORY_DETAILS } from '../constants';

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface MonthlyReportProps {
  employee: Employee | undefined;
  roster: EmployeeRoster;
  year: number;
  month: number; // 0-indexed
  onMonthChange: (month: number) => void;
}

type ReportData = Record<Category, number>;

const chartLabels: Record<Category, string> = {
    [Category.DESCANSO]: 'Descanso',
    [Category.VACACIONES]: 'Vacac.',
    [Category.TURNO_LIMA]: 'T. Lima',
    [Category.MINA_DIA]: 'Mina Día',
    [Category.MINA_NOCHE]: 'Mina Noche',
    [Category.DESCANSO_MEDICO]: 'D. Médico',
    [Category.VISITA_MINA]: 'V. Mina',
    [Category.CURSO]: 'Curso',
    [Category.FERIADOS]: 'Feriados',
};

const MonthlyReport: React.FC<MonthlyReportProps> = ({ employee, roster, year, month, onMonthChange }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    const calculateReport = () => {
      const startDate = new Date(year, month, 16);
      const endDate = new Date(year, month + 1, 15);
      
      const counts = CATEGORIES.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {} as ReportData);

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateKey = formatDateKey(d);
        const category = roster[dateKey];
        if (category && counts.hasOwnProperty(category)) {
          counts[category]++;
        }
      }
      setReportData(counts);
    };

    calculateReport();
  }, [roster, year, month]);

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(parseInt(e.target.value, 10));
  };

  const getMonthRangeText = () => {
    const startMonthName = monthNames[month];
    const endMonthName = monthNames[(month + 1) % 12];
    return `${startMonthName.toUpperCase()}-${endMonthName.toUpperCase()}`;
  };

  if (!reportData) {
    return <div className="text-center p-4">Cargando reporte...</div>;
  }
  
  // FIX: Cast Object.values(reportData) to number[] to satisfy TypeScript's type checker for Math.max.
  const maxCount = Math.max(...(Object.values(reportData) as number[]), 1);

  return (
    <div className="bg-gray-50/50 p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">REPORTE DEL 16 AL 15</h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="month-select" className="text-sm text-gray-600">Mes de corte:</label>
          <select
            id="month-select"
            value={month}
            onChange={handleMonthSelect}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Report Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="bg-white/50">
              <tr className="border-b border-gray-200">
                <th className="p-2 text-left font-semibold text-gray-600 w-1/3">TRABAJADOR</th>
                <td className="p-2 text-gray-800" colSpan={2}>{employee?.name || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="p-2 text-left font-semibold text-gray-600">CORTE DEL MES (16-15)</th>
                <td className="p-2 text-gray-800" colSpan={2}>{getMonthRangeText()}</td>
              </tr>
              {CATEGORIES.map(category => (
                <tr key={category} className="border-b border-gray-200 last:border-b-0">
                  <th className="p-2 text-left font-normal text-gray-600">{`${category}`}</th>
                  <td className="p-2 text-center text-gray-800 font-mono w-16">{reportData[category]}</td>
                  <td className={`p-2 text-center w-12 font-bold ${CATEGORY_DETAILS[category].color}`}>
                    {CATEGORY_DETAILS[category].abbreviation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/50 p-4 rounded-lg flex flex-col justify-center min-h-[300px]">
            <div className="w-full h-64 flex items-end justify-around space-x-1" aria-label="Gráfico de días por categoría">
                {CATEGORIES.map(category => {
                    const count = reportData[category];
                    const details = CATEGORY_DETAILS[category];
                    const heightPercentage = maxCount > 0 ? (count / maxCount) * 85 : 0;

                    return (
                        <div key={category} className="flex-1 flex flex-col items-center justify-end h-full text-center" title={`${category}: ${count} días`}>
                            <span className="text-sm font-bold text-gray-800">{count > 0 ? count : ''}</span>
                            <div className={`w-3/4 max-w-10 rounded-t-sm transition-all duration-500 ease-out ${details.color}`} style={{ height: `${heightPercentage}%` }}>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 h-10 flex items-start justify-center pt-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>{chartLabels[category]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;