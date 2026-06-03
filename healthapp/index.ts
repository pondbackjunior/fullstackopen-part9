import express from "express"
const app = express()
import { calculateBmi } from "./bmiCalculator.ts"
import { calculateExercises } from "./exerciseCalculator.ts"

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const h = Number(req.query.height)
    const w = Number(req.query.weight)
    const result = calculateBmi(h, w)

    if (isNaN(h) || isNaN(w)) {
        return res.status(400).send({error: "malformatted parameters"})
    }

    return res.send({weight: w, height: h, bmi: result})
})

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body

  if (!daily_exercises || target === undefined) {
    return res.status(400).send({ error: "parameters missing" })
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some((n: any) => isNaN(Number(n)))) {
    return res.status(400).send({ error: "malformatted parameters" })
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" })
  }

  const result = calculateExercises(daily_exercises, Number(target))
  return res.send(result)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})