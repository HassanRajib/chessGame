import { copyPosition } from "../helper"

export const movePiece = ({position, piece, eank, file, x, y}) => {
    const newPosition = copyPosition(position)
  
    newPosition[eank][file] = ''
    newPosition[x][y] = piece

    return newPosition
}
export const movePawn = ({position, piece, eank, file, x, y}) => {
    const newPosition = copyPosition(position)
    if(!newPosition[x][y] && x !== eank && y !== file)
        newPosition[eank][y] = ''

    newPosition[eank][file] = ''
    newPosition[x][y] = piece

    return newPosition
}