import actionTypes from "../ActionTypes"

export const makeNewMove = ({newPosition}) => {
    return {
        type : actionTypes.NEW_MOVE,
        payload : {newPosition}
    }
}

export const genetrateCandidates = ({ cadidateMoves}) => {
    return {
        type : actionTypes.GENERATE_CANDIDATE_MOVES,
        payload : {cadidateMoves}
    }
}




