import patientData from '../../data/patients.json'

import { publicPatientEntry } from '../../types'

//const patients: Array<Patient> = patientData;
const publicPatients: Array<publicPatientEntry> = patientData

const getPublicEntries = () => {
    return publicPatients
    }


export default {getPublicEntries}