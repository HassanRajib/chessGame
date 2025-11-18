import { useAppContext } from '../../../contexts/Context'
import { takeBack } from '../../../reducer/actions/Move';

const TakeBack = () => {

    const {dispatch} = useAppContext();

    return <div>
        <button onClick={() => dispatch(takeBack())}>Take back</button>
    </div>
}

export default TakeBack