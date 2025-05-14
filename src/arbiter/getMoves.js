

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