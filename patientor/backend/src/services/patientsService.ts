/* eslint-disable  @typescript-eslint/no-unnecessary-type-assertion */
import patientData from '../../data/patients.ts'
import type { Patient, NonSensitivePatient, NewPatientEntry, NewEntry, Entry } from '../types.ts'
import { v1 as uuid } from 'uuid'

const patients: NonSensitivePatient[] = patientData as NonSensitivePatient[]
const patientsFull: Patient[] = patientData as Patient[]

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const getEntryById = (id: string): Patient | undefined => {
  const patientFull = patientsFull.find(p => p.id === id)
  if (!patientFull) {
    return undefined
  }
  return {
    ...patientFull,
    entries: patientFull.entries ?? []
  }
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    entries: [],
    ...entry
  }

  patientsFull.push(newPatientEntry)
  patients.push({
    id: newPatientEntry.id,
    name: newPatientEntry.name,
    dateOfBirth: newPatientEntry.dateOfBirth,
    gender: newPatientEntry.gender,
    occupation: newPatientEntry.occupation
  })

  return newPatientEntry
}

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patientsFull.find(p => p.id === patientId)
  if (!patient) {
    throw new Error('Patient not found')
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  } as Entry

  patient.entries = patient.entries ?? []
  patient.entries.push(newEntry)

  return newEntry
}

export default {
  getEntries,
  getEntryById,
  addPatient,
  addEntry
}