import { parseArguments } from "./utils.ts" 

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (hours: number[], target: number): Result => {
    const hoursTotal = hours.reduce((a, b) => a + b)
    const ratingCalc = (avgHours: number, target: number) => {
        if (avgHours < target * 0.75) {
            return {rating: 1, desc: "Missed target by quite a lot"}
        } else if (avgHours >= target * 0.75 && avgHours < target) {
            return {rating: 2, desc: "Not too bad but could be better"}
        } else {
            return {rating: 3, desc: "Good job"}
        }
    }
    const avgHours = hoursTotal / hours.length

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(a => a > 0).length,
        success: avgHours > 2,
        rating: ratingCalc(avgHours, target).rating,
        ratingDescription: ratingCalc(avgHours, target).desc,
        target: target,
        average: avgHours
    }
}

if (process.argv[1] === import.meta.filename) {
    const target: number = Number(process.argv[2])
    const hours: number[] = process.argv.slice(3).map(n => Number(n))
    parseArguments(process.argv, 4, Infinity)
    console.log(calculateExercises(hours, target))
}

export default calculateExercises