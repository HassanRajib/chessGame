import { createPosition } from "./helper";


export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'promoting',
    'white' : "White wins",
    'black' : "Black wins",
    'stalemate' : "game is drw",
    'insufficient' : 'Game draws due to insufficient material',
}

export const initGameState = {
    position : [createPosition()],
    turn : "w",
    movesList: [],
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare: null,
    castleDirection : {
        w : 'both',
        b : 'both'
    }
}