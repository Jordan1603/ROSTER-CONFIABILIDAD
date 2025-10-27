import { Category, Employee } from './types';

export const EMPLOYEES: Employee[] = [
  { name: 'Raul Rosalino Perez Gomez', position: 'JEFE DE FIABILIDAD', location: 'CALLAO' },
  { name: 'Carlos Humberto Ortiz Yauri', position: 'SUPERVISOR DE CONFIABILIDAD', location: 'CALLAO' },
  { name: 'Patricia Stefannie Yupanqui Valderrama', position: 'INGENIERO DE CONFIABILIDAD', location: 'CALLAO' },
  { name: 'Bremer Bobadilla Ramirez', position: 'INGENIERO DE CONFIABILIDAD', location: 'CALLAO' },
  { name: 'Franco Alexis Marrufo Zapata', position: 'ANALISTA DE CONFIABILIDAD', location: 'CALLAO' },
  { name: 'Kevin Ruben Chuzon Alexander', position: 'PRACTICANTE PROFESIONAL', location: 'CALLAO' },
  { name: 'Gabriel Jordan Soto Cabezas', position: 'PRACTICANTE PRE PROFESIONAL', location: 'CALLAO' },
  { name: 'Joaquin Alonso Chacon Cordova', position: 'PRACTICANTE PRE PROFESIONAL', location: 'CALLAO' },
  { name: 'Humberto Smith Vasquez Teran', position: 'INGENIERO DE CONFIABILIDAD', location: 'ANTAPACCAY' },
  { name: 'Jorge Luis Peje Gonzales', position: 'INGENIERO DE CONFIABILIDAD', location: 'ANTAPACCAY' },
  { name: 'Percy Junior Calatayud Quispe', position: 'INGENIERO DE CONFIABILIDAD', location: 'QUELLAVECO' },
  { name: 'Carlos Eduardo Quispe Galdos', position: 'INGENIERO DE CONFIABILIDAD', location: 'QUELLAVECO' },
  { name: 'Alexander Fabricio Romero Anconeira', position: 'ANALISTA DE PREDICTIVO', location: 'QUELLAVECO' },
  { name: 'Bryan Ronald Loaiza Merma', position: 'ANALISTA DE PREDICTIVO', location: 'QUELLAVECO' },
  { name: 'Oscar Adaid Ylaquita Almeron', position: 'INSPECTOR DE PM', location: 'QUELLAVECO' },
  { name: 'Juan Augusto Torres Baca', position: 'INSPECTOR DE PM', location: 'QUELLAVECO' },
  { name: 'Luis Soto Cabana', position: 'INSPECTOR DE PM', location: 'QUELLAVECO' },
  { name: 'Emerson Uriel Gutierrez Cueva', position: 'INSPECTOR DE PM', location: 'QUELLAVECO' },
  { name: 'Marlon Angel Maldonado Aguirre', position: 'INGENIERO DE CONFIABILIDAD', location: 'TOROMOCHO' },
  { name: 'Samir Aldair Cedillo Preciado', position: 'INGENIERO DE CONFIABILIDAD', location: 'TOROMOCHO' },
];

export const START_YEAR = 2025;

export const CATEGORIES = Object.values(Category);

export const CATEGORY_DETAILS: Record<Category, { color: string; abbreviation: string }> = {
  [Category.DESCANSO]: { color: 'bg-sky-500 text-white', abbreviation: 'D' },
  [Category.VACACIONES]: { color: 'bg-green-400 text-green-900', abbreviation: 'V' },
  [Category.TURNO_LIMA]: { color: 'bg-yellow-300 text-yellow-900', abbreviation: 'L' },
  [Category.MINA_DIA]: { color: 'bg-blue-300 text-blue-900', abbreviation: 'MD' },
  [Category.MINA_NOCHE]: { color: 'bg-blue-800 text-blue-100', abbreviation: 'MN' },
  [Category.DESCANSO_MEDICO]: { color: 'bg-orange-300 text-orange-900', abbreviation: 'DM' },
  [Category.VISITA_MINA]: { color: 'bg-purple-400 text-purple-900', abbreviation: 'VM' },
  [Category.CURSO]: { color: 'bg-cyan-400 text-cyan-900', abbreviation: 'C' },
  [Category.FERIADOS]: { color: 'bg-red-500 text-white', abbreviation: 'F' },
};