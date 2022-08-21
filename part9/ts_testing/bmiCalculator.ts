

const calculateBmi = (a :number, b: number) => {
    const Bmi = b / a**2;

    if (Bmi < 18) {
        return console.log("Underweight")
    } else if (Bmi < 24.9 ) {
        return console.log("Normal (healthy weight)")
    } else if (Bmi > 25) {
        return  console.log("Overweight")
    }
}

const a = Number(process.argv[2])
const b = Number(process.argv[3])

calculateBmi(a,b)