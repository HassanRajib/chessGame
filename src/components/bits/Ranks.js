import './Ranks.css'

const Ranks = ({ranks}) => {

    return <div className="rank">
        {ranks.map(eank => <span>{eank}</span>)}
    </div>
}

export default Ranks