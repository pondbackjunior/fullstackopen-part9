import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { HealthAndSafety, LocalHospital, Work, Star } from "@mui/icons-material"
import patientService from "../services/patients"
import { Entry, Patient, NewHealthCheckEntry, HealthCheckRating } from "../types"

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [specialist, setSpecialist] = useState("")
  const [diagnosisCodes, setDiagnosisCodes] = useState("")
  const [healthCheckRating, setHealthCheckRating] = useState("")

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID not found")
        return
      }

      try {
        const data = await patientService.getById(id)
        setPatient(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch patient data")
        console.error(err)
      }
    }

    void fetchPatient()
  }, [id])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError(null)

    if (!id) {
      setSubmitError("Patient ID not found")
      return
    }

    const entry: NewHealthCheckEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        .split(",")
        .map((code) => code.trim())
        .filter(Boolean),
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating
    }

    try {
      const addedEntry = await patientService.addEntry(id, entry)
      setPatient((prev) =>
        prev ? { ...prev, entries: [...prev.entries, addedEntry] } : prev
      )
      setDescription("")
      setDate("")
      setSpecialist("")
      setDiagnosisCodes("")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSubmitError(
          err.response?.data ?? err.message ?? "Failed to add entry"
        )
      } else {
        setSubmitError("Failed to add entry")
      }
      console.error(err)
    }
  }

  if (error) return <div>{error}</div>
  if (!patient) return <div>Patient not found</div>

  const renderEntryIcon = (entryType: Entry['type']) => {
    switch (entryType) {
      case "Hospital":
        return <LocalHospital fontSize="small" />
      case "OccupationalHealthcare":
        return <Work fontSize="small" />
      case "HealthCheck":
        return <HealthAndSafety fontSize="small" />
      default:
        return null
    }
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>
        <p>Gender: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <h3>Entries</h3>
        {patient.entries.length === 0 ? (
          <p>No entries found</p>
        ) : (
          <div>
            {patient.entries.map((entry) => (
              <div key={entry.id} style={{ border: "1px solid", marginBottom: "5px", padding: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {renderEntryIcon(entry.type)}
                  <strong>{entry.date}</strong>
                  {entry.type === "OccupationalHealthcare" && "employerName" in entry && (
                    <span> - {entry.employerName}</span>
                  )}
                </div>
                <p>{entry.description}</p>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
                {entry.type === "Hospital" && (
                  <p>
                    discharge: {entry.discharge.date} - {entry.discharge.criteria}
                  </p>
                )}
                {entry.specialist && <p>diagnosed by {entry.specialist}</p>}
                {entry.type === "HealthCheck" && (
                    <p>
                      Health Check Rating:{" "}
                        {Array.from({ length: 3 }, (_, i) => (
                            <Star key={i} fontSize="small" color={i < entry.healthCheckRating ? "error" : "disabled"}/>
                        ))}
                    </p>
                )}
              </div>
            ))}
          </div>
        )}

        <h3>New HealthCheck Entry</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Date:
              <input value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Specialist:
              <input
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Diagnosis codes (comma separated):
              <input
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Health check rating:
              <input
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Add New Entry</button>
        </form>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      </div>
    </div>
  )
}

export default PatientPage