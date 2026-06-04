/* eslint-disable  @typescript-eslint/no-unnecessary-type-assertion */
import patientData from '../../data/patients.ts'
import type { Patient, NonSensitivePatient, NewPatientEntry } from '../types.ts'
import { v1 as uuid } from 'uuid'

const patients: NonSensitivePatient[] = patientData as NonSensitivePatient[]

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getEntries,
  addPatient
}