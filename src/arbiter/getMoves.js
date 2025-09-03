import arbiter from "./Arbiter"


export const getRookMoves = ({position, piece, eank, file}) => {
        const moves = []
        const us = piece[0]
        const enemy = us === 'w' ? 'b' : 'w'

        const direction = [
            [-1,0],
            [1,0],
            [0,-1],
            [0,1],
        ]

        direction.forEach(dir => {
            for (let i = 1; i < 8; i++) {
                const x = eank + (i*dir[0])
                const y = file + (i*dir[1])
                if (position?.[x]?.[y] === undefined)
                    break
                if (position[x][y].startsWith(enemy)){
                    moves.push([x,y])
                    break
                }
                if (position[x][y].startsWith(us))
                    break

                moves.push([x,y])
            }
        })
        return moves
}

export const getKnightMoves = ({position, eank, file}) => {
    const moves = []
    const enemy = position[eank][file].startsWith('w') ? 'b' : 'w'

    const candidates = [
        [-2,-1],
        [-2,1],
        [-1,-2],
        [-1,2],
        [1,-2],
        [1,2],
        [2,-1],
        [2,1],
    ]

    candidates.forEach(c => {
        const cell = position?.[eank+c[0]]?.[file+c[1]]
        if (cell !== undefined && (cell.startsWith(enemy) || cell === ''))
            moves.push([eank+c[0],file+c[1]])
    })

    return moves
}

export const getBishopMove = ({position, piece, eank, file}) => {
        const moves = []
        const us = piece[0]
        const enemy = us === 'w' ? 'b' : 'w'

        const direction = [
            [-1,-1],
            [-1,1],
            [1,-1],
            [1,1],
        ]

        direction.forEach(dir => {
            for (let i = 1; i < 8; i++) {
                const x = eank + (i*dir[0])
                const y = file + (i*dir[1])
                if (position?.[x]?.[y] === undefined)
                    break
                if (position[x][y].startsWith(enemy)){
                    moves.push([x,y])
                    break
                }
                if (position[x][y].startsWith(us))
                    break

                moves.push([x,y])
            }
        })
        return moves
}


export const getQueenMoves = ({position, piece, eank, file}) => {
    const moves = [
        ...getRookMoves({position, piece, eank, file}),
        ...getBishopMove({position, piece, eank, file})
    ]
    return moves
}

export const getKingMove = ({position, piece, eank, file}) => {
        const moves = []
        const us = piece[0]

        const direction = [
            [1,-1],[1,0],[1,1],
            [0,-1],      [0,1],
            [-1,-1],[-1,0],[-1,1]
        ]

        direction.forEach(dir => {
                const x = eank+dir[0]
                const y = file+dir[1]
                if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us))
                    
                moves.push([x,y])
            }
        )
        return moves
}
export const getPawnMove = ({position, piece, eank, file}) => {
        const moves = []
        const dir = piece === 'wp' ? 1 : -1

        if (!position?.[eank+dir][file]){
            moves.push([eank+dir,file])
        }

        if (eank % 5 === 1) {
            if (position?.[eank+dir]?.[file] === '' && position?.[eank+dir+dir]?.[file] === ''){
                moves.push([eank+dir+dir,file])
            }
        }    
        return moves  
}

export const getPawnCaptures = ({position, pervPosition, piece, eank, file}) => {
    const moves = []
    const dir = piece === 'wp' ? 1 : -1
    const enemy = piece[0] === 'w' ? 'b' : 'w'
    // left
    if (position?.[eank+dir]?.[file-1] && position?.[eank+dir]?.[file-1].startsWith(enemy)){
        moves.push([eank+dir,file-1])
    }
    // right
    if (position?.[eank+dir]?.[file+1] && position?.[eank+dir]?.[file+1].startsWith(enemy)){
        moves.push([eank+dir,file+1])
    }
    //try hard
    const enemyPawn = dir === 1 ? 'bp' : 'wp'
    const adjacentFiles = [file-1,file+1]
    if (pervPosition){
        if ((dir === 1 && eank === 4) || (dir === -1 && eank === 3)){
            adjacentFiles.forEach (f => {
                if(position?.[eank]?.[f] === enemyPawn &&
                    position?.[eank+dir+dir]?.[f] === '' &&
                    pervPosition?.[eank]?.[f] === '' &&
                    pervPosition?.[eank+dir+dir]?.[f] === enemyPawn){
                        moves.push([eank+dir,f])
                    }
            })
        }
    }

    return moves
}

export const getCastlingMoves = ({position, castleDirection, piece, eank, file}) => {

    const moves = []

    if (file !== 4 || eank % 7 !== 0 || castleDirection === 'none'){
        return moves
    }
    if (piece.startsWith('w')){
        if (arbiter.isPlayerInCheck({positionAfterMove : position,
            player : 'w'
        }))
            return moves
        if (['left', 'both'.includes(castleDirection)] &&
            !position[0][3] &&
            !position[0][2] &&
            !position[0][1] &&
            position[0][0] === 'wr' &&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:0,y:3}),
                player: 'w'
            }) &&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:0,y:2}),
                player: 'w'
            })
        ) {
                moves.push([0,2])
            }
        if (['right', 'both'.includes(castleDirection)] &&
            !position[0][5] &&
            !position[0][6] &&
            position[0][7] === 'wr'&&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:0,y:5}),
                player: 'w'
            }) &&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:0,y:6}),
                player: 'w'
            })
        ) {
                moves.push([0,6])
            }
    } else {
        if (arbiter.isPlayerInCheck({positionAfterMove : position,
            player : 'w'
        }))
            return moves
        if (['left', 'both'.includes(castleDirection)] &&
            !position[7][3] &&
            !position[7][2] &&
            !position[7][1] &&
            position[7][0] === 'br'&&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:7,y:3}),
                player: 'b'
            }) &&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:7,y:2}),
                player: 'b'
            })
        ) {
                moves.push([7,2])
            }
        if (['right', 'both'.includes(castleDirection)] &&
            !position[7][5] &&
            !position[7][6] &&
            position[7][7] === 'br'&&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:7,y:5}),
                player: 'b'
            }) &&
            !arbiter.isPlayerInCheck({
                positionAfterMove : arbiter.performMove({position,piece,eank,file,x:7,y:6}),
                player: 'b'
            })
        ) {
                moves.push([7,6])
            }
    }

    return moves

}

export const getCastlingDirections = ({ castleDirection, piece, eank, file}) => {
    eank = Number(eank)
    file = Number(file)
    const direction = castleDirection[piece[0]]
    if(piece.endsWith('k'))
        return 'none'

    if (file === 0 && eank === 0){
        if (direction === 'both')
            return 'right'
        if (direction === 'left')
            return 'none'
    }
    if (file === 7 && eank === 0){
        if (direction === 'both')
            return 'left'
        if (direction === 'right')
            return 'none'
    }
    
    if (file === 0 && eank === 7){
        if (direction === 'both')
            return 'right'
        if (direction === 'left')
            return 'none'
    }
    if (file === 7 && eank === 7){
        if (direction === 'both')
            return 'left'
        if (direction === 'right')
            return 'none'
    }
}


export const getKingPosition = (position,player) => {
            let kingPos
            position.forEach((eank,x) => {
                eank.forEach((file, y) => { 
                    if (position[x][y].startsWith(player) && position[x][y].endsWith('k'))
                        kingPos = [x,y]
                })

            })
            return kingPos
}
export const getPieces = (position,enemy) => {
    const enemyPieces = []
        position.forEach((eank,x) => {
                eank.forEach((file,y) => {
                    if (position[x][y].startsWith(enemy))
                        enemyPieces.push({
                    piece : position[x][y],
                    eank: x,
                    file: y,
                })
                })

            })
            return enemyPieces

}