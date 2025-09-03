import { createPosition } from "./helper";


export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'promoting',
    'white' : "White wins",
    'black' : "Black wins",
    'stalemate' : "game is drw"
}

export const initGameState = {
    position : [createPosition()],
    turn : "w",
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare: null,
    castleDirection : {
        w : 'both',
        b : 'both'
    }
}