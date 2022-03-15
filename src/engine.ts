import { BallCount, Bet, LottoGame } from "./models"



const get_ball_counts = (game: LottoGame, history: any[], regularFields: string[], specialField: string) => {
    let res: {regular: BallCount[], special: BallCount[]} = {regular: [], special: []}

    let regular_count: number[] = []
    let special_count: number[] = []
    
    for (let index = 0; index < game.regularBalls.maxValue + 1; index++) regular_count.push(0)
    for (let index = 0; index < game.specialBall.maxValue + 1; index++) special_count.push(0)

    history.forEach(item => {
        regularFields.forEach(rf => regular_count[item[rf]]++)
        //
        special_count[item[specialField]]++
    })

    // no ball marked 0
    for (let index = 1; index < game.regularBalls.maxValue + 1; index++) {
        res.regular.push({value: index, count: regular_count[index]})
    }


    for (let index = 1; index < game.specialBall.maxValue + 1; index++) {
        res.special.push({value: index, count: special_count[index]})
    }

    return res
}

const least_drawn = (counts: BallCount[], numBalls: number) => {
    if (numBalls < 1) return -1
    
    const res = counts
        .sort((a, b) => a.count - b.count)
        .slice(0, numBalls)
        .map(bc => bc.value)

    return numBalls > 1 ? res : res[0]
}

const generate_bet = (game: LottoGame, counts: {regular: BallCount[], special: BallCount[]}) => {
    const regular_draw = least_drawn(counts.regular, game.regularBalls.numBalls)

    return {regular: regular_draw, special: least_drawn(counts.special, 1)} as Bet
}

export {get_ball_counts, least_drawn, generate_bet}