import express from 'express'
import patientsService from '../services/patientsService.ts'
import parseNewPatientEntry, { parseNewEntry } from "../utils.ts"

const router = express.Router()

router.get('/', (_req, res) => {
  const data = patientsService.getEntries()
  res.send(data)
})

router.get("/:id", (req, res) => {
  const data = patientsService.getEntryById(req.params.id)
  res.send(data)
})

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body)
    const addedEntry = patientsService.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send("Error: " + error.message)
    }
  }
})

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientsService.getEntryById(req.params.id)
    if (!patient) {
      return res.status(404).send("Patient not found")
    }
    const newEntry = parseNewEntry(req.body)
    const addedEntry = patientsService.addEntry(patient.id, newEntry)
    return res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = ""
    if (error instanceof Error) {
      try {
        const parsed = JSON.parse(error.message)
        if (Array.isArray(parsed)) {
          errorMessage = parsed.map((err: { message: string }) => err.message).join(", ")
        } else {
          errorMessage = error.message
        }
      } catch {
        errorMessage = error.message
      }
    } else {
      errorMessage = 'Unknown error'
    }
    return res.status(400).send(errorMessage)
  }
})

export default router