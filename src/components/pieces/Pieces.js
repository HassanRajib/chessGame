import { useRef } from 'react';
import './Pieces.css';
import Piece from './piece';
import { useAppContext } from '../../contexts/Context';
import { clearCandidates, makeNewMove } from '../../reducer/actions/Move';
import arbiter from '../../arbiter/Arbiter';
import { openPromotion } from '../../reducer/actions/popup';
import { getCastlingDirections } from '../../arbiter/getMoves';
import { detectCheckmate, detectInsufficientMaterial, detectStalmate, updateCastling } from '../../reducer/actions/game';

const Pieces = () => {
    const ref = useRef()
    const { appState, dispatch } = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]
    

    const calculatecoards = (e) => {
        const {width,left,top} = ref.current.getBoundingClientRect() 
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return{x,y}
    }


    const openPromotionBox = ({eank,file,x,y}) => {
        dispatch(openPromotion({
            eank : Number(eank),
            file : Number(file),
            x,y
        }))
    }

    const updateCastlingStage = ({piece,eank,file}) => {
        const direction = getCastlingDirections({
            castleDirection : appState.castleDirection,
            piece,eank,file
        })

        if (direction) {
            dispatch(updateCastling(direction))
        }
    }

    const move = e => {
        const {x,y} = calculatecoards(e)
        const [piece,eank,file] = e.dataTransfer.getData('text').split(',')
        
        if (appState.candidateMoves.find(m => m[0] === x && m[1] === y)){

            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]
            if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
                openPromotionBox({eank,file,x,y})
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingStage({piece,eank,file})
            }
            const newPosition = arbiter.performMove(
                {
                    position : currentPosition,
                    piece,eank,file, 
                    x,y
                })

                dispatch(makeNewMove({newPosition}))

                if (arbiter.insufficientMaterial(newPosition,opponent, castleDirection)){
                    dispatch(detectInsufficientMaterial())
                } else if (arbiter.isStalemate(newPosition,opponent, castleDirection)){
                    dispatch(detectStalmate())
                } else if (arbiter.isCheckMade(newPosition,opponent, castleDirection)){
                    dispatch(detectCheckmate())
                }
        }

        dispatch(clearCandidates())
    }


        // problem with this 
    const onDrop = (e) => {
        e.preventDefault()
        move (e)
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    return (<div 
        ref={ref}
        onDrop={onDrop}
        onDragOver={onDragOver}

        className='pieces'>
        {currentPosition.map((r,eank) => 
            r.map((f,file) =>
            currentPosition[eank][file]
            ? <Piece key={eank+'-'+file} eank={eank} file={file} piece={currentPosition[eank][file]}/>
            : null
            ))}
    </div>
    ) 

}

export default Pieces