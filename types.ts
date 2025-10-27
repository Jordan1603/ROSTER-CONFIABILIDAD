
export interface Employee {
  name: string;
  position: string;
  location: string;
}

export enum Category {
  DESCANSO = 'DESCANSO',
  VACACIONES = 'VACACIONES',
  TURNO_LIMA = 'TURNO LIMA',
  MINA_DIA = 'MINA DÍA',
  MINA_NOCHE = 'MINA NOCHE',
  DESCANSO_MEDICO = 'DESCANSO MÉDICO',
  VISITA_MINA = 'VISITA MINA',
  CURSO = 'CURSO',
  FERIADOS = 'FERIADOS',
}

export type EmployeeRoster = Record<string, Category>; // Key is YYYY-MM-DD string

export type RosterData = Record<string, EmployeeRoster>; // Key is employee name