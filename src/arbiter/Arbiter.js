import { getBishopMove, getKingMove, getKnightMoves, getQueenMoves, getRookMoves, getPawnMove, getPawnCaptures, getCastlingMoves, getKingPosition, getPieces } from "./getMoves"
import { movePiece, movePawn } from "./move";


const arbiter = {
    getRegulerMovers : function ({position, piece, eank, file}){
        if (piece.endsWith('r'))
        return getRookMoves({position, piece, eank, file});

        if (piece.endsWith('b'))
        return getBishopMove({position, piece, eank, file});
        
        if (piece.endsWith('q'))
        return getQueenMoves({position, piece, eank, file});
        
        if (piece.endsWith('k'))
        return getKingMove({position, piece, eank, file});

        if (piece.endsWith('n'))
        return getKnightMoves({position, eank, file});

        if (piece.endsWith('p'))
        return getPawnMove({position, piece, eank, file})
    },
    getValidMove : function ({position, castleDirection,pervPosition, piece, eank, file}){
        let moves = this.getRegulerMovers({position, piece, eank, file})
        const notInCheckMoves = []
        if (piece.endsWith('p')){
            moves = [
                ...moves,
                ...getPawnCaptures({position,pervPosition, piece, eank, file})
            ]
        }
        
        if (piece.endsWith('k'))
            moves = [
                ...moves,
                ...getCastlingMoves({position, castleDirection, piece, eank, file})
            ]
        
        moves.forEach(([x,y]) => {
            const positionAfterMove = this.performMove({position, piece, eank, file,x,y})
            if(!this.isPlayerInCheck({positionAfterMove,position,player: piece[0]}))
                notInCheckMoves.push([x,y])
        })  
        return notInCheckMoves
    },

    performMove : function ({position,piece,eank,file,x,y}){
        if (piece.endsWith('p')){
            return movePawn({position, piece, eank, file,x,y})
        }
        else {
            return movePiece({position, piece, eank, file,x,y})
        }

    },

    isPlayerInCheck : function ({positionAfterMove,position,player}) {
        const enemy = player.startsWith('w') ? 'b' : 'w'
        let kingPos = getKingPosition(positionAfterMove,player)
        const enemyPieces = getPieces(positionAfterMove,enemy)

        const enemyMoves = enemyPieces.reduce((acc,p) => acc = [
            ...acc,
            ...(p.piece.endsWith('p')
            ?  getPawnCaptures({
                position: positionAfterMove,
                pervPosition: position,
                ...p
            })
            :  this.getRegulerMovers({
                position : positionAfterMove,
                ...p
            })
            )
        ], [])

        if (enemyMoves.some(([x,y]) => kingPos[0] === x && kingPos[1] === y))
            return true

        else
        return false
    }
}
export default arbiter