import { Status } from "../ConsTant"
import actionTypes from "./ActionTypes"

export const reducer = ( state, action ) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE : {
            let {turn, movesList, position} = state
            turn = turn === 'w' ? 'b' : 'w'

            position = [
                ...position,
                action.payload.newPosition
            ]

            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            return {
                ...state,
                movesList,
                turn,
                position
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            const {candidateMoves} = action.payload
            return {
                ...state,
                candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES : {
            return {
                ...state,
                candidateMoves : []
            }
        }
        
        case actionTypes.PROMOTION_OPEN : {
            return {
                ...state,
                status : Status.promoting,
                promotionSquare : {...action.payload}
            }
        }
        
        case actionTypes.PROMOTION_CLOSE : {
            return {
                ...state,
                status : Status.ongoing,
                promotionSquare : null 
            }
        }
        
        case actionTypes.CAN_CASTLE : {
            let {turn , castleDirection} = state
            castleDirection[turn] = action.payload

            return {
                ...state,
                castleDirection
            }
        }

        case actionTypes.STALEMATE : {
            return {
                ...state,
                status : Status.stalemate,
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL : {
            return {
                ...state,
                status : Status.insufficient,
            }
        }

        case actionTypes.NEW_GAME : {
            return {
                ...action.payload
            }
        }

        case actionTypes.WIN : {
            return {
                ...state,
                status : action.payload === 'w' ? Status.white : Status.black
            }
        }
        
        default : 
            return state
    }

}