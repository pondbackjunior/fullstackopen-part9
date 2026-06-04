/* eslint-disable  @typescript-eslint/no-unnecessary-type-assertion */
import diagnosisData from '../../data/diagnoses.ts'
import type { Diagnosis } from '../types.ts'

const diagnoses: Diagnosis[] = diagnosisData as Diagnosis[]

const getEntries = (): Diagnosis[] => {
  return diagnoses
}

const addDiagnosis = () => {
  return null
}

export default {
  getEntries,
  addDiagnosis
}