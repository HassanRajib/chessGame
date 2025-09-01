import actionTypes from "../ActionTypes"

export const updateCastling = (direction) => {
    return {
        type : actionTypes.CAN_CASTLE,
        payload : direction
    }
}