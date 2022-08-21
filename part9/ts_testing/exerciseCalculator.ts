
interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number,
}

interface inputs {
    input1: Array<String>
}
const parseArguments = (args: Array<String>) : inputs 

const calculateExercises = (dailyHours: Array<number>, target: number) => {
    const trainingDays = dailyHours.filter(val => val > 0).length
    const avgHours = dailyHours.reduce((x,y) => x+y, 0)/dailyHours.length
    const success = avgHours >= target ? true : false
    const rating = avgHours /target > 0.7 ? 3 : avgHours/target >= 0.4 ? 2 : 1
    const ratingDescription = rating === 3 ? "Good work" : rating === 2
    ? "not too bad but could be better" :"Very poor, study harder"

    const result: result = {
        periodLength: dailyHours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avgHours

    }

    return result


    }

    console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))