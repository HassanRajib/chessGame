import { useAppContext } from "../../../contexts/Context"
import './MoveList.css'


const MoveList = () => {

    const {appState : {movesList}} = useAppContext()
    return <div className="move-List">
        {movesList.map ((move,i) =>
            <div key={i} data-number={Math.floor((i/2) + 1)}>{move}</div>
        )}
    </div>
}

export default MoveList