export class LottoGame {
    name: string
    
    regularBalls: {numBalls: number, maxValue: number}
    specialBall: {name: string, maxValue: number, separatePot: boolean}

    separatePot = false // powerball scenario

    constructor(name: string, regularBalls: {numBalls: number, maxValue: number}, specialBall: {name: string, maxValue: number, separatePot: boolean}) {
        this.name = name
        this.regularBalls = regularBalls
        this.specialBall = specialBall
    }

    draw = () => {

    }
}


export type BallCount = {value: number, count: number}

export type Bet = {regular: number[], special: number}