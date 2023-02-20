import CandlesBar from "./components/CandlesBar";
import CandlesBarSimple from "./components/CandlesBarSimple";
import Rigid from "./components/Rigid";
import PerspectiveTokens from "./components/PerspectiveTokens";
import PerspectiveTokensPureComponent from "./components/PerspectiveTokensPureComponent"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css';

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
        <BrowserRouter>
            <div class="module box headbtn">
                <td><Link to="/special-octo-giggle">recent_version</Link></td>
                <td><Link to="/special-octo-giggle/pure">pure(upcoming)</Link></td>
                <td><Link to="/special-octo-giggle/d3">d3_experiments</Link></td>
                <td><Link to="/special-octo-giggle/old">old_game</Link></td>
            </div>
            <Routes>
                <Route path="/special-octo-giggle" element={ <PerspectiveTokens/> } />
                <Route path="/special-octo-giggle/d3" element={ <Rigid/> } />
                <Route path="/special-octo-giggle/pure" element={ <PerspectiveTokensPureComponent/> } />
                <Route path="/special-octo-giggle/old" element={ <CandlesBar data={data2} mapping={mapping}/> } />
            </Routes>
        </BrowserRouter>
    </>)
}

export default App;
