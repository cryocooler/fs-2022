import express = require('express');
import calculateBmi from './bmiCalculator';
import { parsedInputExerciseResult } from './exerciseCalculator';

// import { Request, Response } from "express";

// const qs = require('qs')



const app = express()
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req,res) => {

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        res.send({height: Number(req.query.height),
                weight: Number(req.query.weight),
                bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))})
            }
        else {
            res.send({error: "malformatted parameters"})
        }
})

app.post("/exercises", (req, res) => {
  const body = req.body;
  const result = parsedInputExerciseResult(body.target, body.daily_exercises)

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.send(result);
  } catch (error) {
    res.send(error);
  }

})


const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
