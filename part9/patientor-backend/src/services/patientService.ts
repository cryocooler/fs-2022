import patientData from '../../data/patients'

import { Patient, publicPatientEntry, newPatientEntry } from '../../types'

import { v1 as uuid } from 'uuid'
const id = uuid()
const patients: Array<Patient> = patientData;
const publicPatients: Array<publicPatientEntry> = patientData

const getPublicEntries = () => {
    return publicPatients
    }

const addPatient = (entry :newPatientEntry): Patient => {
    const newPatientEntry = {
        id: id,
        ...entry
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}
     




export default {getPublicEntries, addPatient}