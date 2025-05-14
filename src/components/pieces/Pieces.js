import { useState, useRef } from 'react';
import './Pieces.css';
import Piece from './piece';
import { createPosition, copyPosition } from '../../helper';
import { useAppContext } from '../../contexts/Context';
import { clearCandidates, makeNewMove } from '../../reducer/actions/Move';

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
        // problem with this 
    const onDrop = (e) => {
        const newPosition = copyPosition( currentPosition)
        const {x,y} = calculatecoards(e)

        const [p,eank,file] = e.dataTransfer.getData('text').split(',')

        if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
        
        newPosition[eank][file] = ''
        newPosition[x][y] = p

        dispatch(makeNewMove({newPosition}))
        }

        dispatch(clearCandidates())
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