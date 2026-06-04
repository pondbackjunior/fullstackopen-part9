import express from 'express'
import diagnosisService from '../services/diagnosisService.ts'

const router = express.Router()

router.get('/', (_req, res) => {
  const data = diagnosisService.getEntries()
  res.send(data)
})

export default router