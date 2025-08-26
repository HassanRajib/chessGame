import arbiter from "../../arbiter/Arbiter";
import { useAppContext } from "../../contexts/Context";
import { genetrateCandidates } from "../../reducer/actions/Move";

const Piece = ({ eank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, position : currentPosition } = appState;
  

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${eank},${file}`);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMove({
        position: currentPosition[currentPosition.length - 1],
        pervPosition: currentPosition[currentPosition.length - 2],
        piece,
        eank,
        file,
      });
      dispatch(genetrateCandidates({ candidateMoves }));
    }
  };


//   new add
  const onDragEnd = (e) => {
    e.target.style.display = "block";
  };

  return (
    <div
      className={`piece ${piece} p-${file}${eank}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Piece;
