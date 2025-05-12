
import './board.css';

import Pieces from './pieces/Pieces';
import Ranks from './bits/Ranks';
import Files from './bits/Files';

const Board = () => {

    const getClassName = (i,j) => {
        let c = 'liles'
        c+= (i+j)%2 === 0 ? ' white' : ' black' 
        return c
    }

    const eanks = Array(8).fill(0).map((x,i) => 8-i );
    const files = Array(8).fill(0).map((x,i) => i+1);
    
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