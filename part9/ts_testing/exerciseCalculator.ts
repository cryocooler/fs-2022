
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
    input1: number,
    input2: Array<number>
}
const parseArguments = (args: Array<string>) : inputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const arr = args.map(x => parseInt(x)).reduce((x,y) => [...x, y], [])
    return {
        input1: Number(arr[2]),
        input2: arr.slice(3, arr.length)
    }
}

const calculateExercises = (target: number, dailyHours: Array<number>,) => {
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
    return console.log(result)


    }

    // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))


    try {
        const { input1, input2 } = parseArguments(process.argv);
        calculateExercises(input1, input2)
      } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
      }