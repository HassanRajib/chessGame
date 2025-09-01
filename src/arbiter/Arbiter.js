import { getBishopMove, getKingMove, getKnightMoves, getQueenMoves, getRookMoves, getPawnMove, getPawnCaptures, getCastlingMoves } from "./getMoves"
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
        if (piece.endsWith('p')){
            moves = [
                ...moves,
                ...getPawnCaptures({position,pervPosition, piece, eank, file})
            ]
        }
        
        if (piece.endsWith('k')){
            moves = [
                ...moves,
                ...getCastlingMoves({position, castleDirection, piece, eank, file})
            ]
        }
        return moves
    },

    performMove : function ({position,piece,eank,file,x,y}){
        if (piece.endsWith('p')){
            return movePawn({position, piece, eank, file,x,y})
        }
        else {
            return movePiece({position, piece, eank, file,x,y})
        }

    }
}
export default arbiter