import { copyPosition } from "../helper"

export const movePiece = ({position, piece, eank, file, x, y}) => {
    const newPosition = copyPosition(position)
  
    if (piece.endsWith('k') && Math.abs(y - file) > 1){
        if (y === 2){
            newPosition[eank][0] = ''
            newPosition[eank][3] = piece.startsWith('w') ? 'wr' : 'br'
        }
        if (y === 6){
            newPosition[eank][7] = ''
            newPosition[eank][5] = piece.startsWith('w') ? 'wr' : 'br'
        }
    }
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