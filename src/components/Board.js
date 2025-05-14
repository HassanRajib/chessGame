
import './board.css';

import Pieces from './pieces/Pieces';
import Ranks from './bits/Ranks';
import Files from './bits/Files';
import { useAppContext } from '../contexts/Context';

const Board = () => {
    const eanks = Array(8).fill(0).map((x,i) => 8-i );
    const files = Array(8).fill(0).map((x,i) => i+1);
    
    const {appState} = useAppContext()
    const position = appState.position[appState.position.length -1]
    
    const getClassName = (i,j) => {
        let c = 'liles'
        c+= (i+j)%2 === 0 ? ' white' : ' black'

        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c+= ' attacking'
            else
                c+= ' highlight'
        }
        return c
    }

    return(
        
        <div className='board'>
            <Ranks ranks={eanks}/>
            <div className='tile'>
                {eanks.map((eank,i) => 
                    files.map((file,j) =>
                        <div key={eank+'-'+file} className={getClassName(7-i,j)}>
                            
                        </div>
                    ))}
            </div>
            <Pieces/>

            <Files files={files}/>
        </div>
             
    
                )
};

export default Board;