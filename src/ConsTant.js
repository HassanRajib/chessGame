import { createPosition } from "./helper";


export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'promoting',
    'white' : "White wins",
    'bslack' : "Black wins"
}

export const initGameState = {
    position : [createPosition()],
    turn : "w",
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare: null
}