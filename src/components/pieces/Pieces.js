import { useState, useRef } from 'react';
import './Pieces.css';
import Piece from './piece';
import { createPosition, copyPosition } from '../../helper';

const Pieces = () => {

    const ref = useRef()
    const [state, setState] = useState(createPosition())

    const calculatecoards = (e) => {
        const {width,left,top} = ref.current.getBoundingClientRect() 
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return{x,y}
    }
        // problem with this 
    const onDrop = (e) => {
        const newPosition = copyPosition(state)
        const {x,y} = calculatecoards(e)

        const [p,eank,file] = e.dataTransfer.getData('text').split(',')
        
        newPosition[eank][file] = ''
        newPosition[x][y] = p

        setState(newPosition)
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    return (<div 
        ref={ref}
        onDrop={onDrop}
        onDragOver={onDragOver}

        className='pieces'>
        {state.map((r,eank) => 
            r.map((f,file) =>
            state[eank][file]
            ? <Piece key={eank+'-'+file} eank={eank} file={file} piece={state[eank][file]}/>
            : null
            ))}
    </div>
    ) 

}

export default Pieces