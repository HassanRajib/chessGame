import { getCharacter } from '../../helper.js';
import './Files.css'

const Files = ({files}) => {
    return <div className="file">
        {files.map(file => <span key={file}>{getCharacter(file)}</span>)}
    </div>
}

export default Files