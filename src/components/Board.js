import './board.css';

import Pieces from './pieces/Pieces';
import Ranks from './bits/Ranks';
import Files from './bits/Files';
import { useAppContext } from '../contexts/Context';
import Popup from './popup/Popup';
import arbiter from '../arbiter/Arbiter';
import { getKingPosition } from '../arbiter/getMoves';
import PromotionBox from './popup/PromotionBox/PromotionBox';
import GameEnds from './popup/gameEnds/GameEnds';

const Board = () => {
    const eanks = Array(8).fill(0).map((x,i) => 8-i );
    const files = Array(8).fill(0).map((x,i) => i+1);
    
    const {appState} = useAppContext()
    const position = appState.position[appState.position.length -1]

    const isChecked = (() => {
         const isInCheck = arbiter.isPlayerInCheck({
            positionAfterMove : position,
            player : appState.turn
        })
        if (isInCheck)
            return getKingPosition(position,appState.turn)

        return null
    })()
    
    const getClassName = (i,j) => {
        let c = 'liles'
        c+= (i+j)%2 === 0 ? ' white' : ' black'

        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c+= ' attacking'
            else
                c+= ' highlight'
        }
        if (isChecked && isChecked[0] === i && isChecked[1] === j)
            c+= 'checked'
        return c
    }

    return(
        
        <div className='board'>
            <Ranks ranks={eanks}/>
            <div className='tile'>
                {eanks.map((eank,i) => 
                    files.map((file,j) =>
                        <div key={eank+'-'+file}
                            // i= {i}
                            // j={j}                        
                         className={getClassName(7-i,j)}>
                            
                        </div>
                    ))}
            </div>
            <Pieces/>

            <Popup>
                <PromotionBox/>
                <GameEnds/>
            </Popup>

            <Files files={files}/>
        </div>
             
    
                )
};

export default Board;