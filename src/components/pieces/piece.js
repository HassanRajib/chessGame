const Piece = ({
    eank,
    file,
    piece
}) => {

    const onDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${eank},${file}`)
        setTimeout(() => {e.target.style.display = 'none'}, 0)
        
    }

    return(<div

    className={`piece ${piece} p-${file}${eank}`}
        draggable = {true}
        onDragStart={onDragStart}/>
    )
}

export default Piece