import type { NewPatientEntry, NewEntry } from './types.ts'
import { Gender } from './types.ts'
import { z } from 'zod'

const genderEnum = z.enum([Gender.Male, Gender.Female, Gender.Other])

const newPatientEntrySchema = z.object({
  name: z.string().min(1, { message: 'Incorrect or missing name' }),
  dateOfBirth: z.string().refine(
    (date) => !Number.isNaN(Date.parse(date)),
    { message: 'Incorrect or missing date of birth' }
  ),
  gender: genderEnum,
  occupation: z.string().min(1, { message: 'Incorrect or missing occupation' }),
  ssn: z.string().min(1, { message: 'Incorrect or missing ssn' })
})

const baseEntrySchema = z.object({
  description: z.string().min(1, { message: 'Incorrect or missing description' }),
  date: z.string().refine(
    (date) => !Number.isNaN(Date.parse(date)),
    { message: 'Incorrect or missing date' }
  ),
  specialist: z.string().min(1, { message: 'Incorrect or missing specialist' }),
  diagnosisCodes: z.array(z.string()).optional()
})

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().refine(
      (date) => !Number.isNaN(Date.parse(date)),
      { message: 'Incorrect or missing discharge date' }
    ),
    criteria: z.string().min(1, { message: 'Incorrect or missing discharge criteria' })
  })
})

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1, { message: 'Incorrect or missing employer name' }),
  sickLeave: z.object({
    startDate: z.string().refine(
      (date) => !Number.isNaN(Date.parse(date)),
      { message: 'Incorrect or missing sick leave start date' }
    ),
    endDate: z.string().refine(
      (date) => !Number.isNaN(Date.parse(date)),
      { message: 'Incorrect or missing sick leave end date' }
    )
  }).optional()
})

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3)
})

const newEntrySchema = z.discriminatedUnion('type', [
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema
])

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientEntrySchema.parse(object)
}

const parseNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object)
}

export { parseNewPatientEntry, parseNewEntry }
export default parseNewPatientEntry