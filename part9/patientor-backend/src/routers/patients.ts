import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get("/", (_req, res) => {
    console.log('fetching all diagnoses')
    res.send(patientService.getPublicEntries())

})


export default router;