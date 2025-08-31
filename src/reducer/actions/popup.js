import actionTypes from "../ActionTypes"

export const openPromotion = ({eank,file,x,y}) => {
    return {
        type : actionTypes.PROMOTION_OPEN,
        payload : {eank,file,x,y}
    }
}

export const closePopup = () => {
    return {
        type : actionTypes.PROMOTION_CLOSE,
    }
}