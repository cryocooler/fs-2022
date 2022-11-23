import patientData from '../../data/patients';

import { Patient, publicPatientEntry, newPatientEntry, NewEntry, Entry } from '../../types';

import { v1 as uuid } from 'uuid';
const id = uuid();
const patients: Array<Patient> = patientData;
const publicPatients: Array<publicPatientEntry> = patientData;

const getPublicEntries = () => {
    return publicPatients;
    };

const addPatient = (entry :newPatientEntry): Patient => {
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
    console.log('addentry', entry);
    const patientToEnter = findById(id);
    const pushEntry: Entry = {
        id: uuid(),
        ...entry,
    };
    if (patientToEnter) {
    patientToEnter.entries.push(pushEntry);
    } else {
        console.log("ERROR");
    }
    return pushEntry;
};

export const findById = (id: string): Patient | undefined  => {
    const entry = patients.find(p => p.id === id);
    return entry;
};





export default {getPublicEntries, addPatient, addEntry, findById};