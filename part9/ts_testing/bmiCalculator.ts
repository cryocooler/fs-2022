

const calculateBmi = (a :number, b: number) => {
    const Bmi = b / a**2;

    if (Bmi < 18) {
        return "Underweight"
    } else if (Bmi < 24.9 ) {
        return "Normal (healthy weight)"
    }
    
        return  "Overweight"
    
}

// const a = Number(process.argv[2])
// const b = Number(process.argv[3])

// calculateBmi(a,b)


export default calculateBmi