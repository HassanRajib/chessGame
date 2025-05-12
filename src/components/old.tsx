import React from 'react';
import './board.css';
import { getCharacter } from '../helper';

const Board = () => {
    const eanks = Array(8).fill(0).map((x,i) => 8-i );
    const files = Array(8).fill(0).map((x,i) => getCharacter(i+1));
    
    return(
        
        <div className='board'>
            <div className='tile'>
                {eanks.map((eank,i) => 
                    files.map((file,j) =>
                        <div>
                            {eank}{file}
                        </div>
                    ))}
            </div>
        </div>
             )
    
    
};

export default Board;