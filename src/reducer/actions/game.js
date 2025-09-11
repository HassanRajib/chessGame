import { initGameState } from "../../ConsTant"
import actionTypes from "../ActionTypes"

export const updateCastling = (direction) => {
    return {
        type : actionTypes.CAN_CASTLE,
        payload : direction
    }
}

export const detectStalmate = () => {
    return {
        type : actionTypes.STALEMATE,

    }
}

export const detectInsufficientMaterial = () => {
    return {
        type : actionTypes.INSUFFICIENT_MATERIAL,

    }
}

export const setupGame = () => {
    return {
        type : actionTypes.NEW_GAME,
        payload : initGameState

    }
}

export const detectCheckmate = winner => {
    return {
        type : actionTypes.WIN,
        payload : winner
    }
}