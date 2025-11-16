
import { useReducer } from 'react';
import './App.css';
import Board from './components/Board.js';
import AppContext from './contexts/Context.js';
import { reducer } from './reducer/Reducer.js';
import { initGameState } from './ConsTant.js';
import Control from './components/control/Control.js';
import MoveList from './components/control/bit/MoveList.js';
import TakeBack from './components/control/bit/TakeBack.js';

function App() {

  const [ appState, dispatch ] = useReducer(reducer,initGameState)

  const providerState = {
    appState, dispatch
  }
  return (
    <AppContext.Provider value={providerState}>

    <div className="App">
      <Board/>
      <Control>
          <MoveList/>
          <TakeBack/>
      </Control>
    </div>
    </AppContext.Provider>
  );
}

export default App;
