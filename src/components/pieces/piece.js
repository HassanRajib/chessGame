import arbiter from "../../arbiter/Arbiter";
import { useAppContext } from "../../contexts/Context"
import { genetrateCandidates } from "../../reducer/actions/Move";

const Piece = ({
    eank,
    file,
    piece
}) => {

    const {appState, dispatch} = useAppContext()
    const {turn, position} = appState;
    const currentPosition = position[position.length - 1]

    
    

    const onDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${eank},${file}`)
        setTimeout(() => {e.target.style.display = 'none'}, 0)
        if (turn === piece[0]) {
                const candidateMoves = arbiter.getRegulerMovers({position:currentPosition, piece, eank, file})
                dispatch(genetrateCandidates({candidateMoves}))
        }
    }

    return(<div

    className={`piece ${piece} p-${file}${eank}`}
        draggable = {true}
        onDragStart={onDragStart}/>
    )
}

export default Piece