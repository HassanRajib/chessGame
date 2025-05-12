
import { useReducer } from 'react';
import './App.css';
import Board from './components/Board.js';
import AppContext from './contexts/Context.js';
import { reducer } from './reducer/Reducer.js';

function App() {

  const [ appState, dispatch ] = useReducer(reducer,{})

  const providerState = {
    appState, dispatch
  }
  return (
    <AppContext.Provider value={providerState}>

    <div className="App">
      <Board/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
