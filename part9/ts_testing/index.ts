import express = require('express');
import calculateBmi from './bmiCalculator';
// const qs = require('qs')



const app = express()

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
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
