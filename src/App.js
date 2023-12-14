import './App.css';
import Home_Admin from './Components/Home_Admin';
import Sidebar from './Components/Sidebar';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element = {<Sidebar />}  />
          <Route path="/Admin" element = {<Home_Admin />}  />
        </Routes>
    </div>
  );
}

export default App;
