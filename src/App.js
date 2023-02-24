import CandlesBar from "./components/CandlesBar";
import CandlesBarSimple from "./components/CandlesBarSimple";
import PerspectiveTokens from "./components/PerspectiveTokens";

import PerspectiveTokensPureComponent from "./components/PerspectiveTokensPureComponent"
import TradingGame from "./components/TradingGame"
import Rigid from "./components/Rigid";
import Hooks from "./components/Hooks";

import { Counter } from "./features/counter/Counter"

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './index.css';
import store from './app/store'
import { Provider } from 'react-redux'

const data2 = [];

const mapping = {
  date: d => d.Date,
  open: d => d.Open,
  close: d => d.Close,
  high: d => d.High,
  low: d => d.Low,
}

function App() {
    return (<>
      <Provider store={store}>
          <BrowserRouter>
              <div class="module box headbtn">
                  <td><Link to="/special-octo-giggle">recent_version</Link></td>
                  <td><Link to="/special-octo-giggle/d3">d3_experiments</Link></td>
                  <td><Link to="/special-octo-giggle/old">old_game</Link></td>
                  <td><Link to="/special-octo-giggle/hooks">hooks</Link></td>
              </div>
              <Routes>
                  <Route path="/special-octo-giggle" element={ <PerspectiveTokens/> } />
                  <Route path="/special-octo-giggle/d3" element={ <Rigid/> } />
                  <Route path="/special-octo-giggle/pure" element={ <TradingGame/> } />
                  <Route path="/special-octo-giggle/old" element={ <CandlesBar data={data2} mapping={mapping}/> } />
                  <Route path="/special-octo-giggle/counter" element={ <Counter/> } />
                  <Route path="/special-octo-giggle/hooks" element={ <Hooks/> } />
              </Routes>
          </BrowserRouter>
        </Provider>
    </>)
}

export default App;
