export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry  {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry  {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry  {
  type: "OccupationalHealthcare";
  employerName: string;
    sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry  {
  type: "Hospital";
  discharge: { 
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const

export type Gender = typeof Gender[keyof typeof Gender]

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">

export type NewPatientEntry = Omit<Patient, "id" | "entries">

export type NewEntry = Omit<Entry, "id">