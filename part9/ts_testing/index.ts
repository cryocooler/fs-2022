import express = require('express');
import calculateBmi from './bmiCalculator';
// const qs = require('qs')



const app = express()

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req,res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    res.send(calculateBmi(height, weight))

})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
