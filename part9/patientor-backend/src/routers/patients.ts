import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../../utils';
const router = express.Router();


router.get("/", (_req, res) => {
    console.log('fetching all diagnoses');
    res.send(patientService.getPublicEntries());

});

router.get("/:id", (req, res) => {
    console.log("getting id");
    const patient = (patientService.findById(String(req.params.id)));

    if (patient) {
        res.send(patient);
     } else {
        res.sendStatus(404);
        }
    }
);


router.post("/", (req, res) => {
    console.log('adding new patient');
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatientEntry = patientService.addPatient(newPatientEntry);
        res.json(addedPatientEntry);
    } catch (error: unknown ){

        let errorMessage = 'something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;