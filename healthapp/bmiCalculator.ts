import { parseArguments } from "./utils.ts" 

export const calculateBmi = (h: number, w: number): string => {
    const bmi =  w / (h / 100) ** 2
    if (bmi < 16) {
        return "Underweight (Severe thinness)"
    } else if (bmi >= 16 && bmi <= 17) {
        return "Underweight (Moderate thinness)"
    } else if (bmi > 17 && bmi <= 18.5) {
        return "Underweight (Mild thinness)"
    } else if (bmi > 18.5 && bmi <= 25) {
        return "Normal range"
    } else if (bmi > 25 && bmi <= 30) {
        return "Overweight (Pre-obese)"
    } else if (bmi > 30 && bmi <= 35) {
        return "Obese (Class I)"
    } else if (bmi > 35 && bmi < 40) {
        return "Obese (Class II)"
    } else if (bmi >= 40) {
        return "Obese (Class III)"
    } else {
        return "Invalid BMI"
    }
}

if (process.argv[1] === import.meta.filename) {
    const h: number = Number(process.argv[2])
    const w: number = Number(process.argv[3])
    parseArguments(process.argv, 4, 4)

    console.log(calculateBmi(h, w))
}

export default calculateBmi