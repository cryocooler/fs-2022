import express from 'express';
import diagnosisService from '../services/diagnosisService';
const router = express.Router();

router.get("/", (_req, res) => {
    console.log('fetching all diagnoses')
    res.send(diagnosisService.getEntries())

})


export default router;