import { getBishopMove, getKingMove, getKnightMoves, getQueenMoves, getRookMoves, getPawnMove, getPawnCaptures } from "./getMoves"

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
    getValidMove : function ({position,pervPosition, piece, eank, file}){
        let moves = this.getRegulerMovers({position, piece, eank, file})
        if (piece.endsWith('p')){
            moves = [
                ...moves,
                ...getPawnCaptures({position,pervPosition, piece, eank, file})
            ]
        }
        return moves
    }
}
export default arbiter