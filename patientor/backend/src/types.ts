export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const

export type Gender = typeof Gender[keyof typeof Gender]

export type NonSensitivePatient = Omit<Patient, "ssn">

export type NewPatientEntry = Omit<Patient, "id">