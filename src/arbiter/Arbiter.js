import { getBishopMove, getKingMove, getKnightMoves, getQueenMoves, getRookMoves } from "./getMoves"

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
        return getKnightMoves({position, eank, file})
    }
}
export default arbiter