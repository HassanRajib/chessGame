import { getRookMoves } from "./getMoves"

const arbiter = {
    getRegulerMovers : function ({position, piece, eank, file}){
        return getRookMoves({position, piece, eank, file})
    }
}
export default arbiter