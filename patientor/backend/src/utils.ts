import type { NewPatientEntry } from './types.ts'
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

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientEntrySchema.parse(object)
}

export default parseNewPatientEntry